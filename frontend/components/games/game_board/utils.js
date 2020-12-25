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
        // this.moves = [];
    }
}

class move {
    constructor(piece, priorPos, capturedPiece = null, castle = false) {
        this.piece = piece;
        this.priorPos = priorPos;
        this.capturedPiece = capturedPiece;
        this.castle = castle;
        this.movesFor;
    }
}

export class Board {
    constructor(genBoard = true) {
        this.board = {};  // { posKey: tile }
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.currentPieces = {};
        this.currentTurnColor = 'black';
        this.moves = "";
        this.movesFor = { 'white': {}, 'black': {} };
        
        this.moveTree = [];
        
        this.inCheck = false;
        this.threats = [];
        this.deniedMoves = {};
        
        this.kings = {"white": null, "black": null};
        this.kingHasMoved = {"white": false, "black": false};
        this.kingsMoves = [];
        
        this.firstMove = true;

        if (genBoard) {
            this.generateBoard();
            this.findAllMoves();
        }
        this.currentTurnColor = 'white';
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

    kingCastleMoves(king, moves) {
        // console.log("King: ", king);
        if (!this.kingHasMoved[king.color]) {
            const movePos = king.pos.slice();
            if (this.currentPieces[[king.pos[0], 0]] && this.currentPieces[[king.pos[0], 0]].symbol === 'R'
                                                     && this.currentPieces[[king.pos[0], 0]].color === king.color) {
                movePos[1] -= 1;
                if (!this.currentPieces[movePos] && !this.currentPieces[[movePos[0], movePos[1] - 1]]) {
                    let checker = false;
                    for (let i = 0; i < moves.length; i++) {
                        if (moves[i][0] === movePos[0] && moves[i][1] === movePos[1]) {
                            checker = true;
                            break;
                        }
                    }
                    if (checker) {
                        moves.push([king.pos[0], king.pos[1] - 2]);
                    } else {
                        return;
                    }
                    // console.log("added left side castle");
                }
            }
            if (this.currentPieces[[king.pos[0], 7]] && this.currentPieces[[king.pos[0], 7]].symbol === 'R'
                                                     && this.currentPieces[[king.pos[0], 7]].color === king.color) {
                movePos[1] += 2;
                if (!this.currentPieces[movePos] && !this.currentPieces[[movePos[0], movePos[1] + 1]]
                                                 && !this.currentPieces[[movePos[0], movePos[1] + 2]]) {
                    let checker = false;
                    for (let i = 0; i < moves.length; i++) {
                        if (moves[i][0] === movePos[0] && moves[i][1] === movePos[1]) {
                            checker = true;
                            break;
                        }
                    }
                    if (checker) {
                        moves.push([king.pos[0], king.pos[1] + 2]);
                    } else {
                        return;
                    }
                    // console.log("added left side castle");
                }
            }
        }
        return moves;
    }

    singleMoveDirs(piece, dirs, secondary=false) {
        if (this.firstMove) {
            const enemyKing = this.kings[this.oppColor(this.currentTurnColor)];
            if (piece.symbol === 'N') {
                if (Math.abs(piece.pos[0] - enemyKing.pos[0]) > 3 || Math.abs(piece.pos[1] - enemyKing.pos[1]) > 3) {
                    // console.log("no possible moves for knight");
                    return [];
                }
            } else if (piece.symbol === 'K') {
                if (Math.abs(piece.pos[0] - enemyKing.pos[0]) > 2 || Math.abs(piece.pos[1] - enemyKing.pos[1]) > 2) {
                    // console.log("no possible moves for king");
                    return [];
                }
            }
        }
        const moves = [];
        let movePos;
        for (let i = 0; i < dirs.length; i++) {
            movePos = [piece.pos[0] + dirs[i][0], piece.pos[1] + dirs[i][1]];
            if (this.onBoard(movePos)) {
                if (this.currentPieces[movePos] && (this.currentPieces[movePos].color !== piece.color)) {
                    if (this.firstMove) {
                        if (this.currentPieces[movePos].symbol === 'K') {
                            this.inCheck = true;
                            if (!secondary) {
                                this.threats.push([piece, null]);
                                // can optimize dirs here
                            }
                            return [];
                        }
                    } else {
                        if (this.checkThreats(piece, movePos)) {
                            moves.push(movePos);
                        }
                    }
                }
                else if (!this.currentPieces[movePos] && !this.firstMove) {
                    if (this.checkThreats(piece, movePos)) {
                        moves.push(movePos);
                    }
                }
            }
        }
        if (this.firstMove && !secondary) {
            this.threats.push([piece, null]);
        }
        if (!this.firstMove && piece.symbol === 'K') {
            this.kingCastleMoves(piece, moves);
        }
        return moves;
    }

    checkThreats(piece, pos) {
        let bool = true;
        const checkStorage = this.inCheck;
        // make move
        delete this.currentPieces[piece.pos];
        let capPiece = this.currentPieces[pos];
        this.currentPieces[pos] = piece;
        const returnPos = piece.pos.slice();
        piece.pos = pos;
        // set firstmove to true to see checks
        this.firstMove = true;
        // console.log("Threats: ", this.threats);
        for (let i = 0; i < this.threats.length; i++) {
            // check for check
            if (this.threats[i][0].pos[0] !== pos[0] || this.threats[i][0].pos[1] !== pos[1]) {
                this.inCheck = false;
                this.potentialMoves(this.threats[i][0], true, this.threats[i][1]);
                if (this.inCheck) {
                    bool = false;
                    break;
                    // break on check found
                }
            }
        }
        // revert firstmove to false to prevent accidental checks
        this.firstMove = false;
        this.inCheck = checkStorage;
        // revert and return response
        delete this.currentPieces[pos];
        piece.pos = returnPos;
        this.currentPieces[piece.pos] = piece;
        if (capPiece) {
            this.currentPieces[pos] = capPiece;
        }
        return bool;
    }

    moveDirsBools(dirs, posDif, symbol, directionDir, kingPos) {
        if (((dirs[0] === 0 && posDif[0] === 0) || (dirs[1] === 0 && posDif[1] === 0)
                                                || (posDif[0] * dirs[0] === posDif[1] * dirs[1]))
                                                && (((dirs[0] < 0 && posDif[0] < 0) || (dirs[0] > 0 && posDif[0] > 0))
                                                || ((dirs[1] < 0 && posDif[1] < 0) || (dirs[1] > 0 && posDif[1] > 0)))) {
            // direct check potential
            return [true, true];
        } else {
            const checkPositions = {};
            if (directionDir === 0) {
                // rook indirect threats
                if ((dirs[0] === 0 && Math.abs(posDif[0]) === 1) && ((dirs[1] < 0 && posDif[1] < 0) || (dirs[1] > 0 && posDif[1] > 0))) {
                    if (posDif[0] < 0) {
                        // king is above rook going left to right
                        checkPositions[[[kingPos[0] + 1, kingPos[1] - 1]]] = true;
                        checkPositions[[[kingPos[0] + 1, kingPos[1]]]] = true;
                        checkPositions[[[kingPos[0] + 1, kingPos[1] + 1]]] = true;
                    } else {
                        checkPositions[[[kingPos[0] - 1, kingPos[1] - 1]]] = true;
                        checkPositions[[[kingPos[0] - 1, kingPos[1]]]] = true;
                        checkPositions[[[kingPos[0] - 1, kingPos[1] + 1]]] = true;
                    }
                } else if ((dirs[1] === 0 && Math.abs(posDif[1]) === 1) && ((dirs[0] < 0 && posDif[0] < 0) || (dirs[0] > 0 && posDif[0] > 0))) {
                    if (posDif[1] < 0) {
                        // king is left of rook and rook is going up and down
                        checkPositions[[[kingPos[0] + 1, kingPos[1] + 1]]] = true;
                        checkPositions[[[kingPos[0], kingPos[1] + 1]]] = true;
                        checkPositions[[[kingPos[0] - 1, kingPos[1] + 1]]] = true;
                    } else {
                        checkPositions[[[kingPos[0] + 1, kingPos[1] - 1]]] = true;
                        checkPositions[[[kingPos[0], kingPos[1] - 1]]] = true;
                        checkPositions[[[kingPos[0] - 1, kingPos[1] - 1]]] = true;
                    }
                }
                if (Object.values(checkPositions).length !== 0) {
                    return [true, checkPositions];
                }
            } 
            if (directionDir === 1) {
                // bishop indirect threats
                const checkDirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, -1], [-1, 1]];
                for (let i = 0; i < checkDirs.length; i++) {
                    if (((posDif[0] + checkDirs[i][0]) * dirs[0] === (posDif[1] + checkDirs[i][1]) * dirs[1])
                        && ((dirs[0] < 0 && (posDif[0] + checkDirs[i][0]) < 0) || (dirs[0] > 0 && (posDif[0] + checkDirs[i][0]) > 0))) {
                        checkPositions[[[kingPos[0] + checkDirs[i][0]], [kingPos[1] + checkDirs[i][1]]]] = true;
                    }
                }
                if (Object.values(checkPositions).length !== 0) {
                    return [true, checkPositions];
                }
            }
        } 
        return [false, false];
    }

    moveDirs(piece, dirs, secondary) {
        if (this.firstMove) {
            let direct = [];
            const kingPos = this.kings[this.oppColor(this.currentTurnColor)].pos;
            const posDif = [kingPos[0] - piece.pos[0], kingPos[1] - piece.pos[1]];
            const returnDirs = [];
            let multipleDirsPossible = false;
            if (((dirs[0][1] === 0) && !(Math.abs(piece.pos[0] - kingPos[0]) > 1 || Math.abs(piece.pos[1] - kingPos[1]) > 1))
                            || ((dirs[0][1] === 1) && !(Math.abs(piece.pos[0] - kingPos[0]) > 2 || Math.abs(piece.pos[1] - kingPos[1]) > 2))
                            || (dirs.length < 4)) {
                multipleDirsPossible = true;
                // if (!secondary) {
                //     console.log("multiple dirs possible for ", piece.symbol);
                // }
            }
            for (let i = 0; i < dirs.length; i++) {
                const items = this.moveDirsBools(dirs[i], posDif, piece.symbol, dirs[0][1], kingPos)
                if (items[0]) {
                    // console.log(piece, "potential checks: ", items[1]);
                    returnDirs.push(dirs[i]);
                    direct.push(items[1]);
                    if (!multipleDirsPossible) {
                        break;
                    }
                }
            }
            for (let i = 0; i < returnDirs.length; i++) {
                let currentPos = [piece.pos[0] + returnDirs[i][0], piece.pos[1] + returnDirs[i][1]];
                let returnedThreat = false;
                while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
                    if (direct[i] !== true && !secondary) {
                        if (direct[i][currentPos]) {
                            // console.log("piece: ", piece);
                            // console.log("direct: ", direct[i]);
                            this.threats.push([piece, [returnDirs[i]]]);
                            returnedThreat = true;
                            break;
                        }
                    }
                    currentPos[0] += returnDirs[i][0];
                    currentPos[1] += returnDirs[i][1];
                }
                if (returnedThreat) {
                    continue;
                }
                const currentPiece = this.currentPieces[currentPos];
                if (currentPiece) {
                    if (direct[i] !== true && !secondary) {
                        if (direct[i][currentPos] && currentPiece.color === piece.color) {
                            this.threats.push([piece, [returnDirs[i]]]);
                        }
                    } else {
                        if (currentPiece.symbol === 'K' && currentPiece.color !== piece.color) {
                            this.inCheck = true;
                            if (!secondary) {
                                this.threats.push([piece, [returnDirs[i]]]);
                            }
                                // console.log("Check!");
                        } else if (currentPiece.color !== piece.color) {
                            if (!secondary) {
                                this.threats.push([piece, [returnDirs[i]]]);
                            }
                        }
                    }
                }
            }
            return [];
        }
        const moves = [];
        for (let i = 0; i < dirs.length; i++) {
            let currentPos = [piece.pos[0] + dirs[i][0], piece.pos[1] + dirs[i][1]];
            while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
                const tempPush = currentPos.slice();
                if (this.checkThreats(piece, tempPush)) {
                    moves.push(tempPush);
                }
                currentPos[0] += dirs[i][0];
                currentPos[1] += dirs[i][1];
            }
            const currentPiece = this.currentPieces[currentPos];
            if (currentPiece && (currentPiece.color !== piece.color)) {
                if (this.checkThreats(piece, currentPos)) {
                    moves.push(currentPos);
                }
            }
        }
        return moves;
    }

    pawnMoves(piece, secondary) {
        if (this.firstMove) {
            const enemyKing = this.kings[this.oppColor(this.currentTurnColor)];
            if (Math.abs(piece.pos[0] - enemyKing.pos[0]) > 2 || Math.abs(piece.pos[1] - enemyKing.pos[1]) > 2) {
                // console.log("no possible moves for pawn");
            } else {
                let pos = piece.pos.slice();
                if (piece.color === 'white') {
                    pos[0] -= 1;
                } else {
                    pos[0] += 1;
                }
                pos[1] -= 1;
                const king = this.kings[this.oppColor(this.currentTurnColor)];
                if (king.pos[0] === pos[0] && king.pos[1] === pos[1]) {
                    this.inCheck = true;
                }
                pos[1] += 2;
                if (king.pos[0] === pos[0] && king.pos[1] === pos[1]) {
                    this.inCheck = true;
                }
                if (!secondary) {
                    // console.log("pawn threat");
                    this.threats.push([piece, null]);
                }
            }
            return [];
        }
        const dirs = [];
        let movePos; let addition;
        if (piece.color === 'white') { addition = -1; } else { addition = 1; }
        movePos = [piece.pos[0] + addition, piece.pos[1]];
        if (!(this.currentPieces[movePos])) {
            if (this.checkThreats(piece, movePos)) {
                dirs.push(movePos.slice());
            }
            movePos[0] += addition;
            if (((piece.color === 'white' && piece.pos[0] === 6) || (piece.color === 'black' && piece.pos[0] === 1))
                                                                                && !(this.currentPieces[movePos])) {
                if (this.checkThreats(piece, movePos)) {
                    dirs.push(movePos.slice());
                }
            }
            movePos[0] -= addition;
        }
        movePos[1] -= 1;
        let check = this.currentPieces[movePos];
        if (this.onBoard(movePos) && check && check.color !== piece.color) {
            if (this.checkThreats(piece, movePos)) {
                dirs.push(movePos.slice());
            }
        } else if (this.onBoard(movePos) && !check) {
            const lastMove = this.moveTree[this.moveTree.length - 1];
            if (lastMove && lastMove.piece && lastMove.piece.symbol === 'P') {
                if (lastMove.piece.pos[0] - lastMove.priorPos[0] === 2 && lastMove.piece.pos[0] === piece.pos[0]
                                                                       && lastMove.priorPos[1] - movePos[1] === 0) {
                    // 7 to 5 ==> white pawn
                    dirs.push([lastMove.priorPos[0] + 1, lastMove.priorPos[1]]);
                } else if (lastMove.piece.pos[0] - lastMove.priorPos[0] === -2 && lastMove.piece.pos[0] === piece.pos[0]
                                                                               && lastMove.priorPos[1] - movePos[1] === 0) {
                    // 1 to 3 ==> black pawn
                    dirs.push([lastMove.priorPos[0] - 1, lastMove.priorPos[1]]);
                }
            }
        }
        movePos[1] += 2;
        check = this.currentPieces[movePos];
        if (this.onBoard(movePos) && check && check.color !== piece.color) {
            if (this.checkThreats(piece, movePos)) {
                dirs.push(movePos.slice());
            }
        } else if (this.onBoard(movePos) && !check) {
            const lastMove = this.moveTree[this.moveTree.length - 1];
            if (lastMove && lastMove.piece && lastMove.piece.symbol === 'P') {
                if (lastMove.piece.pos[0] - lastMove.priorPos[0] === 2 && lastMove.piece.pos[0] === piece.pos[0]
                                                                       && lastMove.priorPos[1] - movePos[1] === 0) {
                    // 7 to 5 ==> white pawn
                    dirs.push([lastMove.priorPos[0] + 1, lastMove.priorPos[1]]);
                } else if (lastMove.piece.pos[0] - lastMove.priorPos[0] === -2 && lastMove.piece.pos[0] === piece.pos[0]
                                                                               && lastMove.priorPos[1] - movePos[1] === 0) {
                    // 1 to 3 ==> black pawn
                    dirs.push([lastMove.priorPos[0] - 1, lastMove.priorPos[1]]);
                }
            }
        }
        return dirs;
    }

    rookMoves(piece, secondary, dirs=null) {
        if (!dirs) {
            dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        }
        return (this.moveDirs(piece, dirs, secondary));
    }

    bishopMoves(piece, secondary, dirs=null) {
        if (!dirs) {
            dirs = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
        }
        return (this.moveDirs(piece, dirs, secondary));
    }

    queenMoves(piece, secondary, dirs) {
        if (!dirs) {
            const dirsOne = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            const dirsTwo = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
            return (this.moveDirs(piece, dirsOne, secondary).concat(this.moveDirs(piece, dirsTwo, secondary)));
        }
        return (this.moveDirs(piece, dirs, secondary));
    }

    knightMoves(piece, secondary, dirs) {
        if (!dirs) {
            dirs = [[2, 1], [1, 2], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
        }
        return this.singleMoveDirs(piece, dirs, secondary);
    }

    kingMoves(piece, secondary=false) {
        const moveDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]];
        return this.singleMoveDirs(piece, moveDirs, secondary);
    }

    potentialMoves(piece, dontStore=false, dirs=null) {
        let moves;
        switch (piece.symbol) {
            case 'P':
                moves = (this.pawnMoves(piece, dontStore));
                break;
            case 'R':
                moves = (this.rookMoves(piece, dontStore, dirs));
                break;
            case 'N':
                moves = this.knightMoves(piece, dontStore, dirs);
                break;
            case 'B':
                moves = (this.bishopMoves(piece, dontStore, dirs));
                break;
            case 'Q':
                moves = this.queenMoves(piece, dontStore, dirs);
                break;
            case 'K':
                moves = this.kingMoves(piece, dontStore);
                break;
            default:
                console.log('that piece doesn\'t exist');
                console.log(`that piece is: ${piece}`)
                return;
        }
        if (!dontStore) {
            this.movesFor[piece.color][piece.pos] = moves;
        }
        return moves;
    }

    findMovesForColor(color) {
        const pieces = Object.values(this.currentPieces);
        // console.log(pieces);
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].color === color) {
                this.potentialMoves(pieces[i]);
            }
        }
    }

    emptyKingMoves(piece) {
        const moveDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]];
        let moves = [];
        const pos = piece.pos.slice();
        for (let i = 0; i < moveDirs.length; i++) {
            pos[0] += moveDirs[i][0]; pos[1] += moveDirs[i][1];
            if (this.onBoard(pos)) {
                moves.push(pos);
            }
            pos[0] -= moveDirs[i][0]; pos[1] -= moveDirs[i][1];
        }
        this.kingsMoves = moves;
    }

    findAllMoves() {
        this.threats = [];
        this.emptyKingMoves(this.kings[this.oppColor(this.currentTurnColor)]);
        this.firstMove = true;
        this.findMovesForColor(this.currentTurnColor);
        // console.log("Threats: ", this.threats);
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

    addToMovesList(piece, endTile, capture = null, castle = false) {
        this.moveTree.push(new move(piece, piece.pos.slice(), capture, castle));
        // console.log(this.moveTree);

        if (piece.symbol !== 'P') { this.moves += piece.symbol; }
        if (capture) { this.moves += 'x'; }
        this.moves += this.stringifyPos(endTile.pos);
        this.moves += " ";
    }

    promotePawn(piece) {
        let queen = new Piece(piece.pos, 'Q', piece.color); // auto queen for now
        this.currentPieces[piece.pos] = queen;
        this.board[piece.pos].piece = queen;
    }

    isIncluded(positions, pos) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === pos[0] && positions[i][1] === pos[1]) {
                return i+1;
            }
        }
        return false;
    }

    movePiece(moveTile, endTile) {
        // console.log("piece being moved: ", moveTile.piece);
        // console.log("piece destination: ", endTile.pos);
        if (this.isIncluded(this.movesFor[this.currentTurnColor][moveTile.pos], endTile.pos)) {
            const piece = moveTile.piece;
            let castle = false;
            if (piece.symbol === 'K') {
                if (!this.kingHasMoved[this.currentTurnColor]) {
                    this.kingHasMoved[this.currentTurnColor] = this.moveTree.length;
                }
                if (moveTile.pos[1] - endTile.pos[1] === 2) {
                    // console.log("preforming king side castle");
                    const rook = this.currentPieces[[piece.pos[0], 0]];
                    const preTile = this.board[rook.pos];
                    preTile.piece = null;
                    delete this.currentPieces[rook.pos];
                    rook.pos = [piece.pos[0], 2];
                    const postTile = this.board[rook.pos];
                    postTile.piece = rook;
                    this.currentPieces[rook.pos] = rook;
                    castle = rook.pos.slice();
                } else if (moveTile.pos[1] - endTile.pos[1] === -2) {
                    // console.log("preforming queen side castle");
                    const rook = this.currentPieces[[piece.pos[0], 7]];
                    const preTile = this.board[rook.pos];
                    preTile.piece = null;
                    delete this.currentPieces[rook.pos];
                    rook.pos = [piece.pos[0], 4];
                    const postTile = this.board[rook.pos];
                    postTile.piece = rook;
                    this.currentPieces[rook.pos] = rook;
                    castle = rook.pos.slice();
                }
            }
            if (endTile.piece) {
                if (endTile.piece.color === 'black') {
                    this.whiteCaptures.push(endTile.piece);
                } else {
                    this.blackCaptures.push(endTile.piece);
                }
                this.addToMovesList(piece, endTile, endTile.piece, castle);
            } else if (piece.symbol === 'P' && piece.pos[1] !== endTile.pos[1]) {
                let capTile;
                if (piece.color === 'white') {
                    capTile = this.board[[endTile.pos[0] + 1, endTile.pos[1]]];
                } else {
                    capTile = this.board[[endTile.pos[0] - 1, endTile.pos[1]]];
                }
                this.addToMovesList(piece, endTile, capTile.piece, false);
                delete this.currentPieces[capTile.pos];
                capTile.piece = null;
            } else {
                this.addToMovesList(piece, endTile, false, castle);
            }
            endTile.piece = piece;                  // add the piece to the moved to tile
            delete this.currentPieces[piece.pos];       // remove old piece pos from hash
            piece.pos = endTile.pos;                // move the piece's position
            delete this.currentPieces[piece.pos]; // del new pos to setup
            this.currentPieces[piece.pos] = piece;      // update hash piece location
            moveTile.piece = null;                  // remove the piece from its old tile

            if (piece.symbol === 'P' && (piece.pos[0] === 7 || piece.pos[0] === 0)) {
                this.promotePawn(piece);
            }

            this.moveTree[this.moveTree.length - 1].movesFor = JSON.parse(JSON.stringify(this.movesFor));
            this.movesFor['white'] = {}; this.movesFor['black'] = {};  // reset object values

            this.findAllMoves(); // find all moves beginning with pieces of current turn player
            this.currentTurnColor = this.oppColor(this.currentTurnColor);

            return true;
        } else {
            // console.log('Invalid move destination');
            // console.log("piece attempted to move: ", moveTile.piece);
            // console.log("piece destination attempted: ", endTile.pos);
            // console.log("end position piece? ", this.currentPieces[endTile.pos]);
            // console.log("Moves List: ", Object.values(this.movesFor[this.currentTurnColor]));
            return false;
        }
    }

    checkmate() {
        // console.log("Check? ", this.inCheck);
        if (!this.inCheck) {
            return false;
        }
        // console.log("Moves for", this.currentTurnColor, ': ', this.movesFor[this.currentTurnColor]);
        // console.log("Threats: ", this.threats);
        const allMoves = Object.values(this.movesFor[this.currentTurnColor]);
        for (let i = 0; i < allMoves.length; i++) {
            if (allMoves[i].length !== 0) {
                return false;
            }
        }
        console.log("no possible moves");
        return true;
    }

    reverseMove(shouldUndoAgain=true) {
        if (this.moveTree.length === 0) {
            return;
        }
        const idx = this.moveTree.length - 1;
        // console.log("undoing move: ", this.moveTree[idx]);
        const piece = this.moveTree[idx].piece;
        const capture = this.moveTree[idx].capturedPiece
        const priorPos = this.moveTree[idx].priorPos;
        const castle = this.moveTree[idx].castle;
        const reversedPotMoves = JSON.parse(JSON.stringify(this.moveTree[idx].movesFor));
        const priorTile = this.board[priorPos];
        const currentPosTile = this.board[piece.pos];

        if (this.kingHasMoved[this.oppColor(this.currentTurnColor)] === idx) {
            this.kingHasMoved[this.oppColor(this.currentTurnColor)] = false;
        }

        priorTile.piece = piece;                  // add the moved piece to the prior tile
        delete this.currentPieces[piece.pos];       // remove old piece pos from hash
        piece.pos = priorPos;                // move the piece's position
        this.currentPieces[piece.pos] = piece;      // update hash piece location
        currentPosTile.piece = null;                  // remove the piece from its old tile

        if (capture) {
            if (capture.color === 'white') {
                this.blackCaptures.splice(this.blackCaptures.length - 1, 1);
            } else {
                this.whiteCaptures.splice(this.whiteCaptures.length - 1, 1);
            }
            this.board[capture.pos].piece = capture;
            this.currentPieces[capture.pos] = capture;
        } else if (castle) {
            this.kingHasMoved[this.oppColor(this.currentTurnColor)] = false;
            const rook = this.currentPieces[castle];
            delete this.currentPieces[castle];
            this.board[castle].piece = null;
            if (rook.pos[1] === 2) {
                rook.pos[1] = 0;
                this.currentPieces[rook.pos] = rook;
            } else {
                rook.pos[1] = 7;
                this.currentPieces[rook.pos] = rook;
            }
            this.board[rook.pos].piece = rook;
        }

        this.currentTurnColor = piece.color;
        this.moveTree.splice(idx, 1);
        if (shouldUndoAgain && this.moveTree.length > 1) {
            this.reverseMove(false);
        } else {
            this.movesFor = reversedPotMoves;
        }
    }
}