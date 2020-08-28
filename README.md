# README

## Chess With Friends

### This is a web application which allows users to create chess goals for themselves, add their friends to their friends list, and record the games they have played. It comes equipt with a chess computer to play against to improve your skill at chess!

### https://chess-with-friends.herokuapp.com/#/

## Technologies

### This app is build with a rails backend and a react/redux front end. The chess engine runs entirely on javascript.

## Features

### Users can create, edit, and destroy goals for themselves, send friend requests which can be accepted or denied, and play games which are automatically recorded upon game completion.

#### The major issue with this was actually CSS styling and conditionals for when and what to display where. I wanted to use one root CSS *thing* for all of my boxes in order to have it uniform but also keep the code base clean and without repetition. This meant I had to figure out how to nest several flex displays and use percentage values for all widths and heights of elements. The conditionals were solved, essentially, by most of the elements always being on the page and only displaying and fetching certain components based on which values are in the current state shape.

### Users can play against a chess computer which thinks 2 moves ahead to practice and improve (the computer is limited to two moves for faster performance).

#### This required a significant amount of refactoring and modification in order to impliment. The way the Board class is structured, I built its movement and state changing methods almost entirely out of nested objects. This made it very efficient for finding a player's moves and making them on the board object as well as removing any chance of re-calculating positions or piece moves that have already been calculated and dont need re-evaluation. However, this made the ai interaction quite difficult as with so many moving parts, reversing a move the ai has checked became a very difficult process. I resolved this by creating a new board object before checking (with deeply duplicated values from the origional board) and tacking those properties back onto the new board state after moving to artificially reverse a move. The actual base logic for the ai is a fairly simple recursive loop where the computer will check all of its potential moves and rank the state of the game upon that move (the ranking is just based upon pieces on the board). The harder logic for it was implimenting alpha beta pruning for each move in order to increase efficiency by removing any paths that did not need to be traversed.


```js
function findAiMove(board, depth, min = true, alpha = -10000, beta = 10000) {

    if (depth === 0) {
        return [scorePosition(board.currentPieces)];
    }

    const entities = Object.entries(board.movesFor[board.currentTurnColor]);
    let highestVal = 0;
    min ? highestVal = 10000 : highestVal = -10000;
    // playing as black so we want low score
    let bestMove = null;
    shuffle(entities);
    const dupedBoard = dupBoard(board);
    // console.log('entities: ', entities);
    for (let i = 0; i < entities.length; i++) {
        // console.log('current value: ', entities[i][1]);
        for (let j = 0; j < entities[i][1].length; j++) {
            let move = [entities[i][0], entities[i][1][j]];
            move[0] = move[0].split(",");
            move[0][1] = parseInt(move[0][1]); move[0][0] = parseInt(move[0][0]);
            // console.log('inner loop');
            board.movePiece(board.board[move[0]], board.board[move[1]]);
            const score = findAiMove(board, depth - 1, !min)[0];
            board = dupBoard(dupedBoard); // revert state to before a move was made
            // board.reverseMove();
            // console.log('score: ', score);
            if (min) {
                if (score < highestVal) {
                    highestVal = score;
                    bestMove = move;
                }
                beta = Math.min(beta, score)
            } else {
                if (score > highestVal) {
                    highestVal = score;
                    bestMove = move;
                }
                alpha = Math.max(alpha, score);
            }
            if (beta <= alpha) {
                break;
            }
        }
    }
    console.log(`ai ${depth} state(s) into the future`);
    console.log('final best move: ', bestMove);
    console.log('final score: ', highestVal);
    return [highestVal, bestMove];
}
```
