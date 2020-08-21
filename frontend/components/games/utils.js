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
    }

    
}

export class Board {
    constructor() {
        this.board = [];
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.currentPieces = {};
        this.whiteThreats = {}; // { piece.pos => [movePos' leading to king] }
        this.blackThreats = {};
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
                    } else {
                        piece.color = 'black';
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
                    if (currentPiece.symbol === 'K') {
                        if (currentPiece.color === 'white') {
                            this.whiteThreats[currentPiece.pos]; // need to add the array of positions leading to the king
                        } else {
                            this.blackThreats[currentPiece.pos]; // need to add the array of positions leading to the king
                        }
                    }
                }
            }
        }
        return moves;
    }

    pawnMoves(piece) {
        let dirs = [];
        if (piece.color === 'white') {
            dirs = [[-1, 1], [-1, -1]];
            if (!(this.currentPieces[piece.pos[0] - 1, piece.pos[1]])) {
                dirs.push([-1, 0]);
                if (piece.pos[0] === 6 && !(this.currentPieces[piece.pos[0] - 2, piece.pos[1]])) {
                    dirs.push([-2, 0]);
                }
            }
        } else {
            dirs = [[1, 1], [1, -1]];
            if (!(this.currentPieces[piece.pos[0] + 1, piece.pos[1]])) {
                dirs.push([1, 0]);
                if (piece.pos[0] === 1 && !(this.currentPieces[piece.pos[0] + 2, piece.pos[1]])) {
                    dirs.push([2, 0]);
                }
            }
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
        switch (piece.symbol) {
            case 'P':
                return(this.pawnMoves(piece));
            case 'R':
                return(this.rookMoves(piece));
            case 'N':
                return this.knightMoves(piece);
            case 'B':
                return(this.bishopMoves(piece));
            case 'Q':
                return (this.rookMoves(piece).concat(this.bishopMoves(piece)));
            case 'K':
                return this.kingMoves(piece);
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
        console.log('potential moves');
        console.log(moves);
        console.log('destination pos');
        console.log(pos);
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
            this.currentPieces[piece.pos] = piece;
            moveTile.piece = null;
            return true;
        } else {
            console.log('Invalid move destination');
            return false;
        }
    }

    checkmate() {

    }
}