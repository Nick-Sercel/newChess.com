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
                }
                this.currentPieces[piece.pos] = piece;
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

    pawnMoves(piece) {
        const possibleMoves = [];
        if (piece.color === 'white') {
            let currentPos = [piece.pos[0] - 1, piece.pos[1]]
            if (!(this.currentPieces[currentPos])) {
                possibleMoves.push(currentPos)
                currentPos = [piece.pos[0] - 2, piece.pos[1]];
                if (piece.pos[0] === 6 && !(this.currentPieces[currentPos])) {
                    possibleMoves.push(currentPos);
                }
            }
            currentPos = [piece.pos[0] - 1, piece.pos[1] + 1]
            let currentPiece = this.currentPieces[currentPos]
            if (currentPiece && currentPiece.color !== piece.color) {
                possibleMoves.push(currentPos);
            }
            currentPos = [piece.pos[0] - 1, piece.pos[1] - 1];
            currentPiece = this.currentPieces[currentPos];
            if (currentPiece && currentPiece.color !== piece.color) {
                possibleMoves.push(currentPos);
            }
        } else {
            let currentPos = [piece.pos[0] + 1, piece.pos[1]]
            if (!(this.currentPieces[currentPos])) {
                possibleMoves.push(currentPos)
                currentPos = [piece.pos[0] + 2, piece.pos[1]];
                if (piece.pos[0] === 6 && !(this.currentPieces[currentPos])) {
                    possibleMoves.push(currentPos);
                }
            }
            currentPos = [piece.pos[0] + 1, piece.pos[1] + 1]
            let currentPiece = this.currentPieces[currentPos]
            if (currentPiece && currentPiece.color !== piece.color) {
                possibleMoves.push(currentPos);
            }
            currentPos = [piece.pos[0] + 1, piece.pos[1] - 1];
            currentPiece = this.currentPieces[currentPos];
            if (currentPiece && currentPiece.color !== piece.color) {
                possibleMoves.push(currentPos);
            }
        }
        return possibleMoves;
    }

    moveDir(piece, dir) {
        let currentPos = [piece.pos[0] + dir[0], piece.pos[1] + dir[1]];
        const moves = [];
        while (!(this.currentPieces[currentPos]) && this.onBoard(currentPos)) {
            moves.push(currentPos);
            currentPos[0] += dir[0];
            currentPos[1] += dir[1];
        }
        if (this.onBoard(currentPos) && this.currentPieces[currentPos]) {
            if (this.currentPieces[currentPos].color !== piece.color) {
                moves.push(currentPos);
            }
        }
        return moves;
    }

    rookMoves(piece) {
        const moves = [];
        moves.push(this.moveDir(piece, [1, 0]));
        moves.push(this.moveDir(piece, [0, 1]));
        moves.push(this.moveDir(piece, [-1, 0]));
        moves.push(this.moveDir(piece, [0, -1]));
        return moves;
    }

    bishopMoves(piece) {
        const moves = [];
        moves.push(this.moveDir(piece, [1, 1]));
        moves.push(this.moveDir(piece, [-1, -1]));
        moves.push(this.moveDir(piece, [1, -1]));
        moves.push(this.moveDir(piece, [-1, 1]));
        return moves;
    }

    knightMoves(piece) {
        
    }

    potentialMoves(piece) {
        const possibleMoves = [];
        switch (piece.symbol) {
            case 'P':
                possibleMoves.push(this.pawnMoves(piece));
                break;
            case 'R':
                possibleMoves.push(this.rookMoves(piece));
                break;
            case 'N':
                break;
            case 'B':
                possibleMoves.push(this.bishopMoves(piece));
                break;
            case 'Q':
                possibleMoves.push(this.rookMoves(piece));
                possibleMoves.push(this.bishopMoves(piece));
                break;
            case 'K':
                break;
            default:
                console.log('that piece doesn\'t exist');
                return;
        }
    }

    validMove(pos) {
        
        return false;
    }

    movePiece(moveTile, endTile) {
        const piece = moveTile.piece;
        if (endTile.piece) {
            if (endTile.piece.color === 'black-tile') {
                this.whiteCaptures.push(piece);
            } else {
                this.blackCaptures.push(piece);
            }
        }
        endTile.piece = piece;
        moveTile.piece = null;
    }

    checkmate() {

    }
}