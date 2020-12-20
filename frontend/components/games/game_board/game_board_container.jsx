import Board from './game_board';
import React from 'react';
import * as Utils from './utils';
import findAiMove from './chess_ai';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Utils.Board();
        this.state = { board: board };
        this.restartGame = this.restartGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.currentTile = null;
        this.humanTurn = 'white';
        this.potentialMoves = [];
        this.aiTurn = 'black';
        this.humanMoved = false;
        this.currentMove = 0;
        this.gameOver = false;
    }

    restartGame() {
        const board = new Utils.Board();
        this.setState({ board: board });
    }

    updateGame(tile) {
        // console.log("update game called");
        const board = this.state.board;
        // console.log("current turn color: ", board.currentTurnColor);
        if (board.currentTurnColor === this.aiTurn && !this.gameOver) {
            this.makeAiMove(board); // make an ai move on the board -> chess_ai.js util
        } else if (!this.gameOver) {
            // console.log('initial click');
            if (tile.piece && tile.piece.color === board.currentTurnColor) {
                // set piece to be moved
                this.currentTile = tile;
                this.potentialMoves = board.movesFor[tile.piece.color][tile.pos];;
                // }
            } else if (this.currentTile) {
                // set place to move piece
                // console.log('secondary click');
                const moveResult = board.movePiece(this.currentTile, tile);
                if (moveResult) {
                    this.currentTile = null;
                    this.potentialMoves = [];
                    this.humanMoved = true;

                    if (board.checkmate()) {
                        console.log('checkmate');
                        console.log('creating a game for db')
                        const dbGame = {
                            central_user_id: this.props.sessionId,
                            foreign_user_id: 1,
                            winner_id: this.props.sessionId,
                            moves_list: board.moves,
                        };
                        this.props.createGame(dbGame);
                        this.gameOver = true;
                    }

                    board.inCheck = false;
                }
            }
        }

        this.setState({ board: board });
        if (!this.gameOver) {
            if (this.humanMoved && this.aiTurn !== 'none') {
                // console.log("waiting 1/10 second");
                setTimeout(() => {
                    this.humanMoved = false;
                    this.updateGame();
                }, 100);
            }
        }
    }

    makeAiMove(board) {
        // console.log('ai move called');
        this.currentMove++;
        if (this.currentMove === 1) {
            const pieceTile = board.board[[0, 1]];
            const moveTile = board.board[[2, 2]];
            board.movePiece(pieceTile, moveTile);
            return;
        }

        var t0 = performance.now()
        let move = findAiMove(board); // make move with (num) depth
        var t1 = performance.now()
        console.log("Call to make aiMove took " + (t1 - t0)/1000 + " seconds.")

        const pieceTile = board.board[move[1][0]];
        const moveTile = board.board[move[1][1]];
        board.movePiece(pieceTile, moveTile);

        if (board.checkmate()) {
            console.log('checkmate');
            console.log('creating a game for db')
            const dbGame = {
                central_user_id: this.props.sessionId,
                foreign_user_id: 1,
                winner_id: this.props.sessionId,
                moves_list: board.moves,
            };
            this.props.createGame(dbGame);
            this.gameOver = true;
        }
    }

    undoMove() {
        const board = this.state.board;
        board.reverseMove(true);
        this.setState({ board: board });
    }

    render() {
        let whiteCaptures = this.state.board.whiteCaptures;
        let blackCaptures = this.state.board.blackCaptures;
        let whiteCaptureKey = 0;
        let blackCaptureKey = 0;
        let gameOverStuff = <div></div>
        if (this.gameOver) {
            gameOverStuff = <div><li><p>Game Over!</p></li></div>
        }
        return (
            <div className='big-board-container'>
                {gameOverStuff}
                <Board board={this.state.board} updateGame={this.updateGame} potentialMoves={this.potentialMoves} />
                <div className='captured-pieces-container'>
                    <div className='white-captures'>
                        <li><p>White Captures</p></li>
                        <div>
                            {
                                whiteCaptures.map(capture => { // how to fix warning ?
                                    whiteCaptureKey++;
                                    return (
                                        <div key={`${whiteCaptureKey}`}>
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
                                    blackCaptureKey++;
                                    return (
                                        <div key={`${blackCaptureKey}`}>
                                            <li><p>{capture.symbol}</p></li>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='undo-button' onClick={this.undoMove}>
                    <p> Undo </p>
                </div>
            </div>
        )
    }
}

export default Game;