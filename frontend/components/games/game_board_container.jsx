import Board from './game_board';
import React from 'react';
import * as Utils from './utils';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Utils.Board();
        this.state = { board: board };
        // this.restartGame = this.restartGame.bind(this);
        // this.updateGame = this.updateGame.bind(this);
    }

    // restartGame() {
    //     const board = new Utils.Board();
    //     this.setState({ board: board });
    // }

    // updateGame() {
    //     // game logic

    //     this.setState({ board: this.state.board });
    // }

    render() {
        return (
            <div>
                <Board board={this.state.board} />
            </div>
        )
    }
}

export default Game;