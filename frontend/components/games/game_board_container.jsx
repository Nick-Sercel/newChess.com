import Board from './game_board';
import React from 'react';
import * as Utils from './utils';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Utils.Board();
        this.state = { board: board };
        this.restartGame = this.restartGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.currentTile = null;
        this.currentTurn = 'white';
    }

    restartGame() {
        const board = new Utils.Board();
        this.setState({ board: board });
    }

    updateGame(tile) {
        // game logic
        console.log(tile)
        console.log(this.currentTile);
        if (!(this.currentTile)) {
            // console.log('initial click');
            if (tile.piece && tile.piece.color === this.currentTurn) {
                // set piece to be moved
                this.currentTile = tile;
            } else {
                console.log('invalid piece selected');
                // console.log(tile.piece.color);
                // console.log(this.currentTurn);
            }
        } else if (tile.piece) {
            if (tile.piece.color !== this.currentTurn) {
                // set place to move piece
                console.log('secondary click');
                this.state.board.movePiece(this.currentTile, tile);
                this.currentTile = null;
                if (this.currentTurn === 'white') {
                    this.currentTurn = 'black';
                } else {
                    this.currentTurn = 'white';
                }
            } else {
                console.log('You cannot capture your own piece!')
                this.currentTile = null;
            }
        } else {
            // set place to move piece
            console.log('secondary click');
            if (this.state.board.movePiece(this.currentTile, tile)) {
                if (this.currentTurn === 'white') {
                    this.currentTurn = 'black';
                } else {
                    this.currentTurn = 'white';
                }
            }
            this.currentTile = null;
        }

        this.setState({ board: this.state.board });
    }

    render() {
        return (
            <div>
                <Board board={this.state.board} updateGame={this.updateGame} />
            </div>
        )
    }
}

export default Game;