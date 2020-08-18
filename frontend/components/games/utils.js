export class Tile {
    constructor(board, pos) {
        this.board = board;
        this.pos = pos;
    }
}

export class Board {
    constructor() {
        this.grid = [];
        this.generateBoard();
    }

    generateBoard() {
        for (let i = 0; i < 8; i++) {
            this.grid.push([]);
            for (let j = 0; j < 8; j++) {
                const tile = new Tile(this, [i, j]);
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

    checkmate() {

    }
}