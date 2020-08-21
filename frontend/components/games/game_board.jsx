import React from 'react';
import Tile from './game_tile';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let board = this.props.board.board;
        return (
            <div id='board-container'>
                {board.map(row => {
                        return (
                            row.map(tile => {
                                return ( <Tile key={(tile.pos[0] * 8) + tile.pos[1]} tile={tile} updateGame={this.props.updateGame} /> )
                            })
                        )
                }   )}
            </div>
        )
    }
}

export default GameBoard;