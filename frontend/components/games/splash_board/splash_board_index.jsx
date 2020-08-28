import React from 'react';
import Tile from './splash_board_item';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let board = Object.values(this.props.board.board);
        return (
            <div id='board-container'>
                {board.map(tile => {
                    return (<Tile key={(tile.pos[0] * 8) + tile.pos[1]} tile={tile}/>)
                })}
            </div>
        )
    }
}

export default GameBoard;