import React from 'react';
import Space from './game_space';

class GameBoard extends React.Component {

    render() {
        let board = Array.new(8);
        for (let i = 0; i < 8; i++) {
            board[i].push(Array.new(8));
            for (let j = 0; j < 8; j++) {
                board[i][j] = <span class='board-element'></span>;
            }
        }

        return (
            <div id='board-container'>
                {board}
            </div>
        )
    }
}

export default GameBoard;