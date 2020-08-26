import React from 'react';
import Tile from './game_tile';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.hasMoveToShow = this.hasMoveToShow.bind(this);
    }

    hasMoveToShow(pos) {
        // console.log(this.props.potentialMoves);
        for (let i = 0; i < this.props.potentialMoves.length; i++) {
            if (this.props.potentialMoves[i][0] === pos[0] && this.props.potentialMoves[i][1] === pos[1]) {
                return true;
            }
        }
        return false;
    }

    render() {
        let board = this.props.board.board;
        return (
            <div id='board-container'>
                {board.map(row => {
                        return (
                            row.map(tile => {
                                if (this.hasMoveToShow(tile.pos)) {
                                    console.log('returned true');
                                    return ( <Tile key={(tile.pos[0] * 8) + tile.pos[1]} tile={tile} updateGame={this.props.updateGame} green={'green-background'} /> )
                                } else {
                                    return ( <Tile key={(tile.pos[0] * 8) + tile.pos[1]} tile={tile} updateGame={this.props.updateGame} green={'fake-class'} /> )
                                }
                            })
                        )
                }   )}
            </div>
        )
    }
}

export default GameBoard;