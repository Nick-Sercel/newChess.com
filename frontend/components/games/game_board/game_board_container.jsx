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
        this.potentialMoves = [];
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
                this.potentialMoves = this.state.board.potentialMoves(tile.piece, true);
            } else {
                console.log('invalid piece selected');
                // console.log(tile.piece.color);
                // console.log(this.currentTurn);
            }
        } else if (tile.piece) {
            if (tile.piece.color !== this.currentTurn) {
                // set place to move piece
                console.log('secondary click');
                if (this.state.board.movePiece(this.currentTile, tile)) {
                    this.currentTile = null;
                    if (this.currentTurn === 'white') {
                        this.currentTurn = 'black';
                    } else {
                        this.currentTurn = 'white';
                    }
                    if (this.state.board.checkmate(this.currentTurn)) {
                        console.log('checkmate')
                    }
                }
                this.potentialMoves = [];
            } else {
                console.log('You cannot capture your own piece!')
                this.currentTile = tile;
                this.potentialMoves = this.state.board.potentialMoves(tile.piece, true);
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
                if (this.state.board.checkmate(this.currentTurn)) {
                    console.log('checkmate')
                }
                this.currentTile = null;
                this.potentialMoves = [];
            }
        }

        this.setState({ board: this.state.board });
    }

    render() {
        let whiteCaptures = this.state.board.whiteCaptures;
        let blackCaptures = this.state.board.blackCaptures;
        return (
            <div className='big-board-container'>
                <Board board={this.state.board} updateGame={this.updateGame} potentialMoves={this.potentialMoves} />
                <div className='captured-pieces-container'>
                    <div className='white-captures'>
                        <li><p>White Captures</p></li>
                        <div>
                            {
                                whiteCaptures.map(capture => { // how to fix warning ?
                                    return (
                                        <div>
                                            <li><p>{capture.symbol}</p></li>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='black-captures'>
                        <li><p>Black Captures</p></li>
                        <div>
                            {
                                blackCaptures.map(capture => {
                                    return (
                                        <div>
                                            <li><p>{capture.symbol}</p></li>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;