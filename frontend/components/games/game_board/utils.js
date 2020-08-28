export class Tile {
    constructor(pos, piece = null) {
        this.pos = pos;
        this.piece = piece;
        if ((pos[0] + pos[1]) % 2 === 0) {
            this.color = "black-tile";
        } else {
            this.color = "white-tile";
        }
    }
}

export class Piece {
    constructor(pos, symbol, color = null) {
        this.pos = pos;
        this.symbol = symbol;
        this.color = color;
        this.moves = [];
    }
}

export class Board {
    constructor(genBoard = true) {
        this.board = {};  // { posKey: tile }
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.currentPieces = {};
        this.kings = {};
        this.kings['white'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
        this.kings['black'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
        this.currentTurnColor = 'white';
        this.moves = "";
        this.movesFor = { 'white': {}, 'black': {} }; // refactored to { 'white': { piece.pos: [moves] } } -> not removed from piece object
        if (genBoard) { this.generateBoard(); }
        this.lastMove = [];
        this.lastMoveCap = null;
    }

    generateBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let piece = null;
                if (i === 1 || i === 6) {
                    piece = new Piece([i, j], 'P');
                } else if (i === 0 || i === 7) {
                    if (j === 0 || j === 7) {
                        piece = new Piece([i, j], 'R');
                    } else if (j === 1 || j === 6) {
                        piece = new Piece([i, j], 'N');
                    } else if (j === 2 || j === 5) {
                        piece = new Piece([i, j], 'B');
                    } else if (j === 3) {
                        piece = new Piece([i, j], 'K');
                    } else {
                        piece = new Piece([i, j], 'Q');
                    }
                }
                if (piece) {
                    this.movesFor['white'][i, j] = [];
                    if (piece.pos[0] > 5) {
                        piece.color = 'white';
                        if (piece.symbol === 'K') {this.kings['white']['piece'] = piece;}
                    } else {
                        piece.color = 'black';
                        if (piece.symbol === 'K') { this.kings['black']['piece'] = piece; }
                    }
                    this.currentPieces[piece.pos] = piece;
                }
                const tile = new Tile([i, j], piece);
                // const posKey = (i * 8) + j;
                this.board[[i, j]] = tile;
            }
        }
    }

    oppColor(color) {
        if (color === 'white') {
            return 'black';
        } else {
            return 'white';
        }
    }

    onBoard(pos) {
        return (
            pos[0] >= 0 && pos[0] < 8 &&
            pos[1] >= 0 && pos[1] < 8
        );
    }

    singleMoveDirs(piece, dirs) {
        const moves = [];
        let movePos;
        for (let i = 0; i < dirs.length; i++) {
            movePos = [piece.pos[0] + dirs[i][0], piece.pos[1] + dirs[i][1]];
            if (this.onBoard(movePos)) {
                if (this.currentPieces[movePos] && this.currentPieces[movePos].color !== piece.color) {
                    moves.push(movePos);
                } else if (!(this.currentPieces[movePos])) {
                    moves.push(movePos);
                }
            }
        }
        return moves;
    }

    moveDirs(piece, dirs) {
        const moves = [];
        for (let i = 0; i < dirs.length; i++) {
            let currentPos = [piece.pos[0] + dirs[i][0], piece.pos[1] + dirs[i][1]];
            // console.log(this.currentPieces[currentPos]);
            while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
                const tempPush = currentPos.slice();
                moves.push(tempPush);
                currentPos[0] += dirs[i][0];
                currentPos[1] += dirs[i][1];
            }
            if (this.onBoard(currentPos) && this.currentPieces[currentPos]) {
                const currentPiece = this.currentPieces[currentPos];
                if (currentPiece.color !== piece.color) {
                    moves.push(currentPos);
                }
            }
        }
        return moves;
    }

    pawnMoves(piece) {
        const dirs = [];
        if (piece.color === 'white') {
            if (!(this.currentPieces[[piece.pos[0] - 1, piece.pos[1]]])) {
                dirs.push([piece.pos[0] - 1, piece.pos[1]]);
                if (piece.pos[0] === 6 && !(this.currentPieces[[piece.pos[0] - 2, piece.pos[1]]])) { dirs.push([piece.pos[0] - 2, piece.pos[1]])}
            }
            if (this.onBoard([piece.pos[0] - 1, piece.pos[1] - 1]) && this.currentPieces[[piece.pos[0] - 1, piece.pos[1] - 1]]) { dirs.push([piece.pos[0] - 1, piece.pos[1] - 1]) }
            if (this.onBoard([piece.pos[0] - 1, piece.pos[1] + 1]) && this.currentPieces[[piece.pos[0] - 1, piece.pos[1] + 1]]) { dirs.push([piece.pos[0] - 1, piece.pos[1] + 1]) }
        } else {
            if (!(this.currentPieces[[piece.pos[0] + 1, piece.pos[1]]])) {
                dirs.push([piece.pos[0] + 1, piece.pos[1]]);
                if (piece.pos[0] === 1 && !(this.currentPieces[[piece.pos[0] + 2, piece.pos[1]]])) { dirs.push([piece.pos[0] + 2, piece.pos[1]])}
            } // take color into account ?
            if (this.onBoard([piece.pos[0] + 1, piece.pos[1] - 1]) && this.currentPieces[[piece.pos[0] + 1, piece.pos[1] - 1]]) { dirs.push([piece.pos[0] + 1, piece.pos[1] - 1]) }
            if (this.onBoard([piece.pos[0] + 1, piece.pos[1] + 1]) && this.currentPieces[[piece.pos[0] + 1, piece.pos[1] + 1]]) { dirs.push([piece.pos[0] + 1, piece.pos[1] + 1]) }
        }
        return dirs;
    }

    rookMoves(piece) {
        const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        return (this.moveDirs(piece, dirs));
    }

    bishopMoves(piece) {
        const dirs = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
        return (this.moveDirs(piece, dirs));
    }

    knightMoves(piece) {
        const moveDirs = [[2, 1], [1, 2], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
        return this.singleMoveDirs(piece, moveDirs);
    }

    kingMoves(piece) {
        const moveDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]];
        return this.singleMoveDirs(piece, moveDirs);
    }

    findThreatsAndRemove(piece, moves) {                // update this
        const otherColor = this.oppColor(piece.color);
        for (let i = 0; i < moves.length; i++) {
            if (this.isIncluded(this.kings[otherColor]['piece'].moves, moves[i])) {
                (this.kings[otherColor]['indirect'][piece.pos] instanceof Array) ?
                    this.kings[otherColor]['indirect'][piece.pos].push(moves[i]) : this.kings[otherColor]['indirect'][piece.pos] = [moves[i]];
                this.kings[otherColor]['piece'].moves.splice(this.kings[otherColor]['piece'].moves.indexOf(moves[i]), 1);
                console.log(`indirect threat added: ${Object.keys(this.kings[otherColor]['indirect'])}`);
            } else if (moves[i][0] === this.kings[otherColor]['piece'].pos[0] && moves[i][1] === this.kings[otherColor]['piece'].pos[1]) {
                this.kings[otherColor]['direct'][piece.pos] = moves[i];
                console.log(`direct threat added: ${Object.keys(this.kings[otherColor]['direct'])}`);
            }
        }
    }

    findMatchingThreat(primaryThreat, color) {  // primaryThreat should be a piece object reference
        if (this.kings[color]['indirect'][primaryThreat.pos] !== undefined) {
            return this.kings[color]['indirect'][primaryThreat.pos][0]; // should only ever have one position => but it is in an array
        } else {
            return [-1, -1];
        }
    }

    adjacent(piece1, piece2) {
        const pos1 = piece1.pos;
        const pos2 = piece2.pos;
        if ((pos1[0] + 1 === pos2[0] && pos1[1] === pos2[1])
            || (pos1[0] - 1 === pos2[0] && pos1[1] === pos2[1])
            || (pos1[0] + 1 === pos2[0] && pos1[1] + 1 === pos2[1])
            || (pos1[0] + 1 === pos2[0] && pos1[1] - 1 === pos2[1])
            || (pos1[0] - 1 === pos2[0] && pos1[1] + 1 === pos2[1])
            || (pos1[0] - 1 === pos2[0] && pos1[1] - 1 === pos2[1])
            || (pos1[0] === pos2[0] && pos1[1] + 1 === pos2[1])
            || (pos1[0] === pos2[0] && pos1[1] - 1 === pos2[1])
            ) {
             return true;
        }
        return false;
    }

    findSavesOnMove(piece, moves) {     // needs update
        const dThreats = Object.values(this.kings[piece.color]['direct']);
        if (dThreats.length !== 0) {
            const threatLocations = Object.keys(this.kings[piece.color]['direct']);
            const threatPieces = [];
            for (let i = 0; i < threatLocations.length; i++) {
                threatPieces.push(this.currentPieces[threatLocations[i]]);  // take the [pos[0], pos[1]] from the keys and find their objects
            }
            for (let i = 0; i < threatPieces.length; i++) {
                for (let j = 0; j < moves.length; j++) {
                    if (moves[j] === threatPieces[i].pos) {
                        this.kings[piece.color]['saves'][piece.pos] = moves[j];
                    } else if (threatPieces[j].symbol !== 'N' && threatPieces[j].symbol !== 'P' && !(this.adjacent(threatPieces[j], this.kings[piece.color]['piece']))) {
                        const blockPos = this.findMatchingThreat(threatPieces[j]);
                        if (moves[j] === blockPos) {
                            this.kings[piece.color]['saves'][piece.pos] = moves[j];
                        }
                    }

                }
            }
        }
    }

    potentialMoves(piece) {
        let moves;
        switch (piece.symbol) {
            case 'P':
                moves = (this.pawnMoves(piece)); // add enpausant and test promotion
                // console.log(`pawn moves: ${moves}`);
                break;
            case 'R':
                moves = (this.rookMoves(piece));
                // console.log(`rook moves: ${moves}`);
                break;
            case 'N':
                moves = this.knightMoves(piece);
                // console.log(`knight moves: ${moves}`);
                break;
            case 'B':
                moves = (this.bishopMoves(piece));
                // console.log(`bishop moves: ${moves}`);
                break;
            case 'Q':
                moves = (this.rookMoves(piece).concat(this.bishopMoves(piece)));
                // console.log(`queen moves: ${moves}`);
                break;
            case 'K': // add castling and restrictions on moving near enemy kings
                moves = this.kingMoves(piece)
                // console.log(`king moves: ${moves}`);
                // this.kings[piece.color].moves = moves; // done in call statement
                break;
            default:
                console.log('that piece doesn\'t exist');
                console.log(`that piece is: ${piece}`)
                return;
        }
        if (piece.symbol !== 'K') {
            if (piece.color !== this.currentTurnColor) {
                this.findThreatsAndRemove(piece, moves);
            } else {
                this.findSavesOnMove(piece, moves);         // does not exist yet
            }
        }
        this.movesFor[piece.color][piece.pos] = moves;
        return moves;
    }

    isIncluded(positions, pos) {
        // console.log(`positions to check: ${positions}`);
        // console.log(`pos checked: ${pos}`);
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === pos[0] && positions[i][1] === pos[1]) {
                return true;
            }
        }
        return false;
    }

    findMovesForColor(color) {
        const pieces = Object.values(this.currentPieces);
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].color === color && pieces[i].symbol !== 'K') {
                this.potentialMoves(pieces[i]);
            }
        }
    }

    findAllMoves() {
        this.kings[this.currentTurnColor]['piece'].moves = this.potentialMoves(this.kings[this.currentTurnColor]['piece']);
        this.kings[this.oppColor(this.currentTurnColor)]['piece'].moves = this.potentialMoves(this.kings[this.oppColor(this.currentTurnColor)]['piece']);
        this.findMovesForColor(this.currentTurnColor);
        this.findMovesForColor(this.oppColor(this.currentTurnColor));
    }

    validMove(piece, pos) {
        if (this.isIncluded(this.movesFor[piece.color][piece.pos], pos)) { // may break w/o Object.values
            return true;
        }
        return false;
    }

    stringifyPos(pos) {
        let returnStr = '';
        switch (pos[1]) {
            case 0:
                returnStr += 'a';
                break;
            case 1:
                returnStr += 'b';
                break;
            case 2:
                returnStr += 'c';
                break;
            case 3:
                returnStr += 'd';
                break;
            case 4:
                returnStr += 'e';
                break;
            case 5:
                returnStr += 'f';
                break;
            case 6:
                returnStr += 'g';
                break;
            case 7:
                returnStr += 'h';
                break;
        }
        returnStr += String(pos[0] + 1);
        return returnStr;
    }

    addToMovesList(piece, endTile, capture = null) {
        if (piece.symbol !== 'P') { this.moves += piece.symbol; }
        if (capture) { this.moves += 'x'; }
        this.moves += this.stringifyPos(endTile.pos);
        this.moves += " ";
        console.log(this.moves);
    }

    promotePawn(tile) {
        let queen = new Piece(tile.pos, 'Q', tile.piece.color); // auto queen for now
        this.currentPieces[tile.pos] = queen;
        tile.piece = queen;
        this.potentialMoves(queen);
    }

    movePiece(moveTile, endTile) {
        // console.log
        this.potentialMoves(moveTile.piece);
        if (this.validMove(moveTile.piece, endTile.pos)) {
            this.kings['white']['direct'] = {}; this.kings['white']['indirect'] = {}; this.kings['white']['saves'] = {}
            this.kings['black']['direct'] = {}; this.kings['black']['indirect'] = {}; this.kings['black']['saves'] = {}
            
            this.lastMove = [moveTile.pos, endTile.pos];

            const piece = moveTile.piece;
            if (endTile.piece) {
                if (endTile.piece.color === 'black') {
                    this.whiteCaptures.push(endTile.piece);
                } else {
                    this.blackCaptures.push(endTile.piece);
                }
                this.lastMoveCap = endTile.piece;
                this.addToMovesList(piece, endTile, true);
            } else {
                this.lastMoveCap = null;
                this.addToMovesList(piece, endTile);
            }
            endTile.piece = piece;                  // add the piece to the moved to tile
            delete this.currentPieces[piece.pos];       // remove old piece pos from hash
            piece.pos = endTile.pos;                // move the piece's position
            if (piece.symbol === 'K') {
                this.kings[piece.color]['piece'].pos = piece.pos
            }
            this.currentPieces[piece.pos] = piece;      // update hash piece location
            moveTile.piece = null;                  // remove the piece from its old tile
            if (piece.symbol === 'P' && (piece.pos[0] === 7 || piece.pos[0] === 0)) {
                this.promotePawn(piece);
            }
            this.movesFor['white'] = {}; this.movesFor['black'] = {};  // reset object values => may be unnecessary
            this.findAllMoves(); // find all moves beginning with pieces of current turn player
            this.currentTurnColor = this.oppColor(piece.color);
            return true;
        } else {
            console.log('Invalid move destination');
            return false;
        }
    }

    // reverseMove() {
    //     this.board[this.lastMove[0]].piece = this.currentPieces[this.lastMove[1]];
    //     // state -> old tile has piece and new tile has piece => same piece
    //     this.board[this.lastMove[1]].piece = null;
    //     // state -> only old tile now has the piece
    //     if (this.lastMoveCap) { this.board[this.lastMove[1]].piece = this.lastMoveCap }
    //     // add the deleted piece back to the moved pos tile if there was one

    //     this.currentPieces[this.lastMove[0]] = this.currentPieces[this.lastMove[1]];
    //     // state -> currentPieces[oldPos] has the same piece as currentPieces[newPos]
    //     delete this.currentPieces[this.lastMove[1]];
    //     // state -> piece deleted from new pos
    //     if (this.lastMoveCap) { this.currentPieces[this.lastMove[1]] = this.lastMoveCap }
    //     // replace the moved pos with the deleted piece if there was one

    //     // need to revserse pawn promotions too but thats gonna take a minute

    //     this.currentTurnColor = this.oppColor(this.currentTurnColor);
    //     this.findAllMoves();
    // }

    inCheck(color) {

    }

    checkmate(otherTurnCol) {
        // console.log(`non-object white king: ${this.kings['white']['direct']}`)
        // console.log(`non-object black king: ${this.kings['black']['direct']}`)
        // console.log(`other turn color: ${otherTurnCol}`);
        const dThreats = Object.keys(this.kings[otherTurnCol]['direct']);
        console.log(`dThreats: ${dThreats}`);
        if (dThreats.length !== 0) {
            console.log('has dThreats');
            console.log(`king escapes: ${this.kings[otherTurnCol]['piece'].moves}`);
            const saves = Object.keys(this.kings[otherTurnCol]['saves']);
            console.log(`piece saves: ${saves}`);
            if (this.kings[otherTurnCol]['piece'].moves.length === 0 && saves.length === 0) {
                return true;
            } else {
                return false;
            }
        } else if (this.kings[otherTurnCol]['piece'].moves.length === 0 && Object.values(this.movesFor[otherTurnCol].length === 0)) {
            console.log('stalemate');
            return true;
        } else {
            return false;
        }
    }
}