export class Tile {
    constructor(board, pos, piece = null) {
        this.board = board;
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
    constructor() {
        this.board = [];
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.currentPieces = {};
        this.whiteThreats = {}; // { indirect => {piece.pos => [movePos' leading to king] }  direct => {piece.pos => [movePos' leading to king] } }
        this.blackThreats = {};
        this.whiteThreats["direct"] = {};
        this.blackThreats["direct"] = {};
        this.whiteKing = null;
        this.blackKing = null;
        this.generateBoard();
    }

    generateBoard() {
        for (let i = 0; i < 8; i++) {
            this.board.push([]);
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
                    if (piece.pos[0] > 5) {
                        piece.color = 'white';
                        if (piece.symbol === 'K') {this.whiteKing = piece;}
                    } else {
                        piece.color = 'black';
                        if (piece.symbol === 'K') { this.blackKing = piece; }
                    }
                    this.currentPieces[piece.pos] = piece;
                }
                const tile = new Tile(this, [i, j], piece);
                this.board[i].push(tile);
            }
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
            console.log(this.currentPieces[currentPos]);
            const movesForTheKing = [];
            while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
                const tempPush = currentPos.slice();
                movesForTheKing.push(tempPush);
                currentPos[0] += dirs[i][0];
                currentPos[1] += dirs[i][1];
            }
            moves.push(movesForTheKing);
            if (this.onBoard(currentPos) && this.currentPieces[currentPos]) {
                const currentPiece = this.currentPieces[currentPos];
                if (currentPiece.color !== piece.color) {
                    moves.push(currentPos);
                    // if (currentPiece.symbol === 'K') {
                    //     if (currentPiece.color === 'white') {
                    //         this.whiteThreats["direct"][currentPiece.pos] = movesForTheKing; // add the array of positions leading to the king
                    //     } else {
                    //         this.blackThreats["direct"][currentPiece.pos] = movesForTheKing; // add the array of positions leading to the king
                    //     }
                    // }
                }
            }
        }
        return moves;
    }

    pawnMoves(piece) {
        const dirs = [];
        if (piece.color === 'white') {
            if (!(this.currentPieces[piece.pos[0] - 1, piece.pos[1]])) {
                dirs.push([-1, 0]);
                if (piece.pos[0] === 6 && !(this.currentPieces[piece.pos[0] - 2, piece.pos[1]])) {dirs.push([-2, 0])}
            }
            if (this.currentPieces[piece.pos[0] - 1, piece.pos[1] - 1]) {dirs.push([-1, -1])}
            if (this.currentPieces[piece.pos[0] - 1, piece.pos[1] + 1]) { dirs.push([-1, 1]) }
        } else {
            if (!(this.currentPieces[piece.pos[0] + 1, piece.pos[1]])) {
                dirs.push([1, 0]);
                if (piece.pos[0] === 1 && !(this.currentPieces[piece.pos[0] + 2, piece.pos[1]])) {dirs.push([2, 0])}
            }
            if (this.currentPieces[piece.pos[0] + 1, piece.pos[1] - 1]) { dirs.push([1, -1]) }
            if (this.currentPieces[piece.pos[0] + 1, piece.pos[1] + 1]) { dirs.push([1, 1]) }
        }
        return this.singleMoveDirs(piece, dirs);
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
                moves = (this.pawnMoves(piece)); // add enpausant and promotion
                break;
            case 'R':
                moves = (this.rookMoves(piece));
                break;
            case 'N':
                moves = this.knightMoves(piece);
                break;
            case 'B':
                moves = (this.bishopMoves(piece));
                break;
            case 'Q':
                moves = (this.rookMoves(piece).concat(this.bishopMoves(piece)));
                break;
            case 'K': // add castling
                moves = this.kingMoves(piece)
                if (piece.color = 'white') {
                    this.whiteKing.moves = moves;
                } else {
                    this.blackKing.moves = moves;
                }
                break;
            default:
                console.log('that piece doesn\'t exist');
                return;
        }
        this.findThreatsOnMove(piece, moves);
        return moves;
    }

    removeImpossibleKingMoves(king) {
        switch (king.color) {
            case 'white':
                for (let i = 0; i < king.moves.length; i++) {
                    if (this.whiteThreats['indirect'][king.moves[i]]) {
                        king.moves.splice(i, 1);
                    }
                }
                return;
            case 'black':
                for (let i = 0; i < king.moves.length; i++) {
                    if (this.blackThreats['indirect'][king.moves[i]]) {
                        king.moves.splice(i, 1);
                    }
                }
                return;
            default:
                return;
        }
    }

    findThreatsOnMove(piece, moves) {
        switch (piece.color) {
            case 'white':
                this.whiteKing.moves = this.potentialMoves(this.whiteKing);
                this.removeImpossibleKingMoves(this.whiteKing);
                for (let i = 0; i < moves.length; i++) {
                    if (this.isIncluded(this.blackKing.moves, moves[i])) {
                        this.blackThreats['indirect'][piece.pos] ? this.blackThreats['indirect'][piece.pos].push(moves[i]) : [];
                        this.blackKing.moves.splice(this.blackKing.moves.indexOf(moves[i]), 1);
                    } else if (moves[i] === this.kingPositions[1]) {
                        this.blackThreats['direct'][piece.pos] = moves[i];
                    }
                }
                break;
            case 'black':
                this.blackKing.moves = this.potentialMoves(this.blackKing);
                this.removeImpossibleKingMoves(this.blackKing);
                for (let i = 0; i < moves.length; i++) {
                    if (this.isIncluded(this.whiteKing.moves, moves[i])) {
                        this.whiteThreats['indirect'][piece.pos] ? this.whiteThreats['indirect'][piece.pos].push(moves[i]) : [];
                        this.whiteKing.moves.splice(this.whiteKing.moves.indexOf(moves[i]), 1);
                    }
                }
                break;
            default:
                console.log('that piece doesn\'t exist');
                return;
        }
    }

    isIncluded(positions, pos) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === pos[0] && positions[i][1] === pos[1]) {
                return true;
            }
        }
        return false;
    }

    validMove(piece, pos) {
        const moves = this.potentialMoves(piece);
        // console.log('potential moves');
        // console.log(moves);
        // console.log('destination pos');
        // console.log(pos);
        if (this.isIncluded(moves, pos)) {
            return true;
        }
        return false;
    }

    movePiece(moveTile, endTile) {
        if (this.validMove(moveTile.piece, endTile.pos)) {
            const piece = moveTile.piece;
            if (endTile.piece) {
                if (endTile.piece.color === 'black-tile') {
                    this.whiteCaptures.push(piece);
                } else {
                    this.blackCaptures.push(piece);
                }
            }
            endTile.piece = piece;
            delete this.currentPieces[piece.pos];
            piece.pos = endTile.pos;
            if (piece.symbol === 'K') {
                if (piece.color === 'white') {
                    this.kingPositions[0] = piece.pos;
                } else {
                    this.kingPositions[1] = piece.pos;
                }
            }
            this.currentPieces[piece.pos] = piece;
            moveTile.piece = null;
            return true;
        } else {
            console.log('Invalid move destination');
            return false;
        }
    }

    hasThreatSaves(color) {

    }

    checkmate(otherTurnCol) {
        switch (otherTurnCol) {
            case 'white':
                if (this.whiteKing.moves === []) {
                    if (this.hasThreatSaves(otherTurnCol)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
                break;
            case 'black':
                if (this.blackKing.moves === []) {
                    if (this.hasThreatSaves(otherTurnCol)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
                break;
            default:
                console.log('invalid turn color');
                return;
        }
    }
}