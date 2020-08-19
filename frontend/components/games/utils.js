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
        this.grid = [];
        this.whiteCaptures = [];
        this.blackCaptures = [];
        this.generateBoard();
    }

    generateBoard() {
        for (let i = 0; i < 8; i++) {
            this.grid.push([]);
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
                const tile = new Tile(this, [i, j], piece);
                this.grid[i].push(tile);
            }
        }
    }

    onBoard(pos) {
        return (
            pos[0] >= 0 && pos[0] < 8 &&
            pos[1] >= 0 && pos[1] < 8
        );
    }

    validMove(pos) {
        if (this.onBoard(pos)) {
            return true;
        }
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