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
        this.currentTile = null;
        this.humanTurn = 'white';
        this.potentialMoves = [];
        this.aiTurn = 'black';
        this.humanMoved = false;
        this.currentMove = 0;
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
        if (board.currentTurnColor === this.aiTurn) {
            this.makeAiMove(board); // make an ai move on the board -> chess_ai.js util
        } else {
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
                    if (board.movePiece(this.currentTile, tile)) {
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
                if (board.movePiece(this.currentTile, tile)) {
                    this.currentTile = null;
                    this.potentialMoves = [];
                    this.humanMoved = true;
                }
            }
        }
        if (board.checkmate(board.currentTurnColor)) {
            console.log('checkmate')
        }

        this.setState({ board: board });
        if (this.humanMoved) {
            this.humanMoved = false;
            this.updateGame();
        }
    }

    makeAiMove(board) {

            console.log('ai move called');

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
            dupBoard.currentPieces = JSON.parse(JSON.stringify(board.currentPieces));
            dupBoard.kings = JSON.parse(JSON.stringify(board.kings));
            dupBoard.currentTurnColor = board.currentTurnColor;
            // not gonna add in the moves array since it doesnt matter for this
            dupBoard.movesFor = JSON.parse(JSON.stringify(board.movesFor));

            const move = findAiMove(dupBoard, 3); // make move with (num) depth

            console.log('ai move: ', move);
            const pieceTile = board.board[move[1][0]];
            const moveTile = board.board[move[1][1]];
            console.log('pieceTile: ', pieceTile);
            console.log('moveTile: ', moveTile);
            board.movePiece(pieceTile, moveTile);

            // const pieceTile = board.board[[1, 6]];
            // const moveTile = board.board[[3, 6]];
            // console.log('pieceTile: ', pieceTile);
            // console.log('moveTile: ', moveTile);
            // board.movePiece(pieceTile, moveTile);
        }
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