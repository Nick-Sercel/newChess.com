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
        // game logic
        const board = this.state.board;
        // console.log('currentTurnColor: ', board.currentTurnColor);
        // console.log('aiTurn', this.aiTurn);
        if (board.currentTurnColor === this.aiTurn && !this.gameOver) {
            this.makeAiMove(board); // make an ai move on the board -> chess_ai.js util
        } else if (!this.gameOver) {
            console.log(tile)
            console.log(this.currentTile);
            if (!(this.currentTile)) {
                // console.log('initial click');
                if (tile.piece && tile.piece.color === this.humanTurn) {
                    // set piece to be moved
                    this.currentTile = tile;
                    if (!board.movesFor[this.currentTile.piece.color][this.currentTile.pos]) {
                        this.potentialMoves = board.potentialMoves(this.currentTile.piece);
                    } else {
                        this.potentialMoves = board.movesFor[tile.piece.color][tile.pos];;
                    }
                } else {
                    console.log('invalid piece selected');
                    // console.log(tile.piece.color);
                    // console.log(this.currentTurn);
                }
            } else if (tile.piece) {
                if (tile.piece.color !== this.humanTurn) {
                    // set place to move piece
                    console.log('secondary click');
                    const moveResult = board.movePiece(this.currentTile, tile);
                    if (moveResult === 'end') {
                        console.log('creating a game for db')
                        const dbGame = {
                            central_user_id: this.props.sessionId,
                            foreign_user_id: 1,
                            winner_id: this.props.sessionId,
                            moves_list: board.moves,
                        };
                        this.props.createGame(dbGame);
                        this.gameOver = true;
                    } else if (moveResult) {
                        this.currentTile = null;
                        this.potentialMoves = [];
                        this.humanMoved = true;
                    }
                } else {
                    console.log('You cannot capture your own piece!')
                    this.currentTile = tile;
                    if (!board.movesFor[this.currentTile.piece.color][this.currentTile.pos]) {
                        this.potentialMoves = board.potentialMoves(this.currentTile.piece);
                    } else {
                        this.potentialMoves = board.movesFor[tile.piece.color][tile.pos];;
                    }
                }
            } else {
                // set place to move piece
                console.log('secondary click');
                const moveResult = board.movePiece(this.currentTile, tile);
                if (moveResult) {
                    this.currentTile = null;
                    this.potentialMoves = [];
                    this.humanMoved = true;
                }
            }
        }
        // if (board.checkmate(board.currentTurnColor)) { // re-enable with real game
        //     console.log('checkmate')
        // }

        this.setState({ board: board });
        if (!this.gameOver) {
            if (this.humanMoved) {
                this.humanMoved = false;
                this.updateGame();
            }
        }
    }

    makeAiMove(board) {

        console.log('ai move called');

        // this.currentMove++;
        // if (this.currentMove === 1) {
        //     const pieceTile = board.board[[1, 2]];
        //     const moveTile = board.board[[2, 2]];
        //     board.movePiece(pieceTile, moveTile);
        // } else if (this.currentMove === 2) {
        //     const pieceTile = board.board[[1, 1]];
        //     const moveTile = board.board[[3, 1]];
        //     board.movePiece(pieceTile, moveTile);
        // }
        // return;

        let moveResult = false;
        this.currentMove++;
        if (this.currentMove === 1) {
            const pieceTile = board.board[[0, 1]];
            const moveTile = board.board[[2, 2]];
            board.movePiece(pieceTile, moveTile);
        } else if (this.currentMove === 2) {
            const pieceTile = board.board[[0, 6]];
            const moveTile = board.board[[2, 5]];
            board.movePiece(pieceTile, moveTile);
        } else {
            const dupBoard = new Utils.Board(false);
            // boarddd.properties = Object.assign({}, board.properties);    // not deep duplication
            dupBoard.board = JSON.parse(JSON.stringify(board.board));
            dupBoard.whiteCaptures = board.whiteCaptures.slice();
            dupBoard.blackCaptures = board.blackCaptures.slice();
            // console.log('no, over here')
            dupBoard.currentPieces = JSON.parse(JSON.stringify(board.currentPieces));
            // console.log('actually, here')
            // dupBoard.kings = JSON.parse(JSON.stringify(board.kings));        // re-enable
            dupBoard.currentTurnColor = board.currentTurnColor;
            // not gonna add in the moves array since it doesnt matter for this
            dupBoard.movesFor = JSON.parse(JSON.stringify(board.movesFor));

            const move = findAiMove(dupBoard, 2); // make move with (num) depth

            console.log('ai move: ', move);
            const pieceTile = board.board[move[1][0]];
            const moveTile = board.board[move[1][1]];
            console.log('pieceTile: ', pieceTile);
            console.log('moveTile: ', moveTile);
            moveResult = board.movePiece(pieceTile, moveTile);
        }

        if (moveResult === 'end') {
            const dbGame = {
                central_user_id: this.props.sessionId,
                foreign_user_id: 1,
                winner_id: 1,
                moves_list: board.moves,
            };
            this.props.createGame(dbGame);
            this.gameOver = true;
        }
    }

    undoMove() {
        const board = this.state.board;
        board.reverseMove();
        this.setState({ board: board });
    }

    render() {
        let whiteCaptures = this.state.board.whiteCaptures;
        let blackCaptures = this.state.board.blackCaptures;
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
                <div className='undo-button' onClick={this.undoMove}>
                    <p> Undo </p>
                </div>
            </div>
        )
    }
}

export default Game;