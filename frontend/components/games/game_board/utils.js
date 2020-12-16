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

class move {
    constructor(piece, priorPos, capturedPiece = null) {
        this.piece = piece;
        this.priorPos = priorPos;
        this.capturedPiece = capturedPiece;
    }
}

export class Board {
    constructor(genBoard = true) {
        this.board = {};  // { posKey: tile }
        this.kings = { "white": null, "black": null };
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.currentPieces = {};
        this.currentTurnColor = 'white';
        this.moves = "";
        this.movesFor = { 'white': {}, 'black': {} };
        if (genBoard) { this.generateBoard(); }

        this.moveTree = [];

        this.inCheck = false;
        this.threats = [];
        this.deniedMoves = {};

        this.kingsMoves = [];
        this.kings = {"white": null, "black": null};

        this.firstMove = true;
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
                        if (i > 5) {
                            this.kings["white"] = piece;
                        } else {
                            this.kings["black"] = piece;
                        }
                    } else {
                        piece = new Piece([i, j], 'Q');
                    }
                }
                if (piece) {
                    this.movesFor['white'][i, j] = [];
                    if (piece.pos[0] > 5) {
                        piece.color = 'white';
                    } else {
                        piece.color = 'black';
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
                    if (this.firstMove) {
                        moves.push(movePos);
                        if (this.currentPieces[movePos] && this.currentPieces[movePos].symbol === 'K') {
                            this.inCheck = true;
                            console.log("Check!");
                        }
                    } else {
                        if (this.checkThreats()) {
                            moves.push(movePos);
                        }
                    }
                } else if (!(this.currentPieces[movePos])) {
                    moves.push(movePos);
                    const idx = this.isIncluded(this.kingsMoves, movePos);
                    this.kingsMoves.splice(idx, 1);
                }
            }
        }
        return moves;
    }

    checkThreats() {
        return true;
    }

    moveDirs(piece, dirs) {
        const moves = [];
        for (let i = 0; i < dirs.length; i++) {
            let currentPos = [piece.pos[0] + dirs[i][0], piece.pos[1] + dirs[i][1]];
            // console.log(this.currentPieces[currentPos]);
            while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
                const tempPush = currentPos.slice();
                if (this.firstMove) {
                    moves.push(tempPush);
                    const idx = this.isIncluded(this.kingsMoves, tempPush);
                    this.kingsMoves.splice(idx, 1);
                } else {
                    if (this.checkThreats()) {
                        moves.push(tempPush);
                    }
                }
                currentPos[0] += dirs[i][0];
                currentPos[1] += dirs[i][1];
            }
            if (this.onBoard(currentPos) && this.currentPieces[currentPos]) {
                const currentPiece = this.currentPieces[currentPos];
                if (currentPiece.color !== piece.color) {
                    moves.push(currentPos);
                    if (this.currentPieces[currentPos] && this.currentPieces[currentPos].symbol === 'K') {
                        this.inCheck = true;
                        console.log("Check!");
                    }
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
            let check = this.currentPieces[[piece.pos[0] - 1, piece.pos[1] - 1]];
            if (this.onBoard([piece.pos[0] - 1, piece.pos[1] - 1]) && check && check.color === 'black') { dirs.push([piece.pos[0] - 1, piece.pos[1] - 1]) }
            check = this.currentPieces[[piece.pos[0] - 1, piece.pos[1] + 1]];
            if (this.onBoard([piece.pos[0] - 1, piece.pos[1] + 1]) && check && check.color === 'black') { dirs.push([piece.pos[0] - 1, piece.pos[1] + 1]) }
        } else {
            if (!(this.currentPieces[[piece.pos[0] + 1, piece.pos[1]]])) {
                dirs.push([piece.pos[0] + 1, piece.pos[1]]);
                if (piece.pos[0] === 1 && !(this.currentPieces[[piece.pos[0] + 2, piece.pos[1]]])) { dirs.push([piece.pos[0] + 2, piece.pos[1]])}
            }
            let check = this.currentPieces[[piece.pos[0] + 1, piece.pos[1] - 1]];
            if (this.onBoard([piece.pos[0] + 1, piece.pos[1] - 1]) && check && check.color === 'white') { dirs.push([piece.pos[0] + 1, piece.pos[1] - 1]) }
            check = this.currentPieces[[piece.pos[0] + 1, piece.pos[1] + 1]];
            if (this.onBoard([piece.pos[0] + 1, piece.pos[1] + 1]) && check && check.color === 'white') { dirs.push([piece.pos[0] + 1, piece.pos[1] + 1]) }
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

    potentialMoves(piece) {
        let moves;
        switch (piece.symbol) {
            case 'P':
                moves = (this.pawnMoves(piece)); // add enpausant and test promotion
                // console.log(`pawn moves: ${moves}`);
                break;
            case 'R':
                moves = (this.rookMoves(piece));
                if (this.firstMove) {
                    this.threats.push(piece);
                }
                // console.log(`rook moves: ${moves}`);
                break;
            case 'N':
                moves = this.knightMoves(piece);
                // console.log(`knight moves: ${moves}`);
                break;
            case 'B':
                moves = (this.bishopMoves(piece));
                if (this.firstMove) {
                    this.threats.push(piece);
                }
                // console.log(`bishop moves: ${moves}`);
                break;
            case 'Q':
                moves = (this.rookMoves(piece).concat(this.bishopMoves(piece)));
                if (this.firstMove) {
                    this.threats.push(piece);
                }
                // console.log(`queen moves: ${moves}`);
                break;
            case 'K': // add castling and restrictions on moving near enemy kings
                if (this.firstMove) {
                    moves = this.kingMoves(piece);
                } else {
                    moves = this.kingsMoves;
                }
                // console.log(`king moves: ${moves}`);
                break;
            default:
                console.log('that piece doesn\'t exist');
                console.log(`that piece is: ${piece}`)
                return;
        }
        this.movesFor[piece.color][piece.pos] = moves;
        return moves;
    }

    findMovesForColor(color) {
        const pieces = Object.values(this.currentPieces);
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].color === color && pieces[i].symbol !== 'K') {
                this.potentialMoves(pieces[i]);
            }
        }
    }

    findAllMoves(aiMove) {
        this.kingsMoves = this.kingMoves(this.kings[this.oppColor(this.currentTurnColor)]);
        this.firstMove = true;
        this.findMovesForColor(this.currentTurnColor);
        this.firstMove = false;
        this.findMovesForColor(this.oppColor(this.currentTurnColor));
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
        this.moveTree.push(new move(piece, piece.pos.slice(), capture));
        console.log(this.moveTree);

        if (piece.symbol !== 'P') { this.moves += piece.symbol; }
        if (capture) { this.moves += 'x'; }
        this.moves += this.stringifyPos(endTile.pos);
        this.moves += " ";
        // console.log(this.moves);
    }

    promotePawn(tile) {
        let queen = new Piece(tile.pos, 'Q', tile.piece.color); // auto queen for now
        this.currentPieces[tile.pos] = queen;
        tile.piece = queen;
        this.potentialMoves(queen);
    }

    isIncluded(positions, pos) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === pos[0] && positions[i][1] === pos[1]) {
                return i;
            }
        }
        return false;
    }

    validMove(piece, pos) {
        if (this.isIncluded(this.movesFor[piece.color][piece.pos], pos)) {
            return true;
        }
        return false;
    }

    movePiece(moveTile, endTile, aiMove = false) {
        // this.potentialMoves(moveTile.piece);
        if (this.validMove(moveTile.piece, endTile.pos)) {
            
            let gameOver = false;

            const piece = moveTile.piece;
            if (endTile.piece) {
                if (endTile.piece.color === 'black') {
                    this.whiteCaptures.push(endTile.piece);
                } else {
                    this.blackCaptures.push(endTile.piece);
                }
                this.addToMovesList(piece, endTile, endTile.piece);
            } else {
                this.addToMovesList(piece, endTile);
            }
            endTile.piece = piece;                  // add the piece to the moved to tile
            delete this.currentPieces[piece.pos];       // remove old piece pos from hash
            piece.pos = endTile.pos;                // move the piece's position
            this.currentPieces[piece.pos] = piece;      // update hash piece location
            moveTile.piece = null;                  // remove the piece from its old tile
            if (piece.symbol === 'P' && (piece.pos[0] === 7 || piece.pos[0] === 0)) {
                this.promotePawn(piece);
            }
            this.movesFor['white'] = {}; this.movesFor['black'] = {};  // reset object values

            this.findAllMoves(aiMove); // find all moves beginning with pieces of current turn player
            this.currentTurnColor = this.oppColor(this.currentTurnColor);

            gameOver = this.checkmate();
            if (endTile.piece && endTile.piece.symbol === 'K') {
                gameOver = true;
            }

            if (gameOver) { return 'end'; }
            return true;
        } else {
            console.log('Invalid move destination');
            return false;
        }
    }

    checkmate() {
        if (!this.inCheck) {
            return false;
        }
        if (Object.values(this.movesFor[this.currentTurnColor]).length === 0) {
            return true;
        }
        return false;
    }

    reverseMove(shouldUndoAgain) {
        if (this.moveTree.length === 0) {
            return;
        }
        const idx = this.moveTree.length - 1;
        console.log(idx);
        console.log(this.moveTree[idx]);
        const piece = this.moveTree[idx].piece;
        const capture = this.moveTree[idx].capturedPiece
        const priorPos = this.moveTree[idx].priorPos;
        const priorTile = this.board[priorPos];
        const currentPosTile = this.board[piece.pos];

        priorTile.piece = piece;                  // add the moved piece to the prior tile
        delete this.currentPieces[piece.pos];       // remove old piece pos from hash
        piece.pos = priorPos;                // move the piece's position
        this.currentPieces[piece.pos] = piece;      // update hash piece location
        currentPosTile.piece = null;                  // remove the piece from its old tile

        if (capture) {
            currentPosTile.piece = capture;
            // remove from captured list
            if (capture.color === 'white') {
                this.whiteCaptures.splice(this.whiteCaptures.length - 1, 1);
            } else {
                this.blackCaptures.splice(this.blackCaptures.length - 1, 1);
            }
            this.currentPieces[capture.pos] = capture;
        }

        this.currentTurnColor = piece.color;
        this.moveTree.splice(idx, 1);
        if (!shouldUndoAgain) {
            this.reverseMove(true);
        } else {
            this.movesFor['white'] = {}; this.movesFor['black'] = {};  // reset object values => may be unnecessary
    
            this.findAllMoves(); // find all moves beginning with pieces of current turn player
        }
    }
}




// begin game by finding white to move then black to move

// upon move, check move player's next moves then current player

// checkmate === king threatened and no way to move plus no way to block