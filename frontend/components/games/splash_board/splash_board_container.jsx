import Board from './splash_board_index';
import React from 'react';
import * as Utils from '../game_board/utils';
import { connect } from 'react-redux';

class Game extends React.Component {
    componentWillUnmount() {
        clearInterval(this.timer);
        console.log('cleared interval');
    }

    constructor(props) {
        super(props);
        const board = new Utils.Board();
        this.state = { board: board };
        this.restartGame = this.restartGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.aiTurn1 = 'white';
        this.aiTurn2 = 'black';
        this.currentMove = 0;
        this.timer = setInterval(() => this.updateGame(), 3000);
    }

    restartGame() {
        const board = new Utils.Board();
        this.setState({ board: board });
        this.currentMove = 0;
        this.potentialMoves = [];
    }

    updateGame() {
        // console.log('update game');
        
        if (this.currentMove === 10) {
            this.restartGame();
        } else {
            this.makeAiMove(this.state.board);
        }

    }

    makeAiMove(board) {

        // console.log('ai move called');

        this.currentMove++;
        if (this.currentMove === 1) {
            board.movePiece(board.board[[7, 6]], board.board[[5, 5]]);
        } else if (this.currentMove === 2) {
            board.movePiece(board.board[[0, 1]], board.board[[2, 2]]);
        } else if (this.currentMove === 3) {
            board.movePiece(board.board[[7, 1]], board.board[[5, 2]]);
        } else if (this.currentMove === 4) {
            board.movePiece(board.board[[0, 6]], board.board[[2, 5]]);
        } else if (this.currentMove === 5) {
            board.movePiece(board.board[[6, 3]], board.board[[4, 3]]);
        } else if (this.currentMove === 6) {
            board.movePiece(board.board[[1, 4]], board.board[[3, 4]]);
        } else if (this.currentMove === 7) {
            board.movePiece(board.board[[4, 3]], board.board[[3, 4]]);
        } else if (this.currentMove === 8) {
            board.movePiece(board.board[[2, 2]], board.board[[3, 4]]);
        } else if (this.currentMove === 9) {
            board.movePiece(board.board[[5, 5]], board.board[[3, 4]]);
        } else if (this.currentMove === 10) {
            board.movePiece(board.board[[0, 4]], board.board[[3, 4]]);
        } else {
            console.log('this shouldnt have been called');
        }
        this.setState({ board: board });
    }

    render() {
        let whiteCaptures = this.state.board.whiteCaptures;
        let blackCaptures = this.state.board.blackCaptures;
        return (
            <div className='big-board-container'>
                <Board board={this.state.board}/>
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