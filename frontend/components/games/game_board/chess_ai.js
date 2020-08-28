import * as Utils from './utils';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function dupBoard (board) { // this apparently slow af - maybe write custom duplicator?
    const dupBoard = new Utils.Board(false);
    // boarddd.properties = Object.assign({}, board.properties);    // not deep duplication -> maybe try on base components of each object for speed ?
    dupBoard.board = JSON.parse(JSON.stringify(board.board));
    dupBoard.whiteCaptures = board.whiteCaptures.slice();
    dupBoard.blackCaptures = board.blackCaptures.slice();
    dupBoard.currentPieces = JSON.parse(JSON.stringify(board.currentPieces));
    // dupBoard.kings = JSON.parse(JSON.stringify(board.kings));        //re-enable
    dupBoard.currentTurnColor = board.currentTurnColor;
    dupBoard.moves = board.moves.slice(); // maybe type error for string, idk
    dupBoard.movesFor = JSON.parse(JSON.stringify(board.movesFor));
    return dupBoard;
}

// function findAiMove (board) {
//     // random board element
//     console.log('random ai move');
//     const entities = Object.entries(board.movesFor[board.currentTurnColor]);
//     shuffle(entities);
//     shuffle(entities[0][1]);
//     // console.log(entities[0][1][0]);
//     entities[0][0] = entities[0][0].split(",")
//     entities[0][0][1] = parseInt(entities[0][0][1]); entities[0][0][0] = parseInt(entities[0][0][0])
//     // console.log(entities[0]);
//     return [entities[0][0], entities[0][1][0]];
// }

// function addBoardProps(dupBoard, board) {
//     dupBoard.board = JSON.parse(JSON.stringify(board.board));
//     dupBoard.whiteCaptures = board.whiteCaptures.slice();
//     dupBoard.blackCaptures = board.blackCaptures.slice();
//     dupBoard.currentPieces = JSON.parse(JSON.stringify(board.currentPieces));
//     dupBoard.kings = JSON.parse(JSON.stringify(board.kings));
//     dupBoard.currentTurnColor = board.currentTurnColor;
//     dupBoard.moves = board.moves.slice(); // maybe type error for string, idk
//     dupBoard.movesFor = JSON.parse(JSON.stringify(board.movesFor));
// }

// function findAiMove (board, depth) {
//     console.log('ai one state into the future');
//     const entities = Object.entries(board.movesFor[board.currentTurnColor]);
//     let highestVal = 100000; // playing as black so we want low score
//     let bestMove = null;
//     shuffle(entities);
//     const dupedBoard = dupBoard(board);
//     // console.log('entities: ', entities);
//     for (let i = 0; i < entities.length; i++) {
//         console.log('current value: ', entities[i][1]);
//         for (let j = 0; j < entities[i][1].length; j++) {
//             let move = [entities[i][0], entities[i][1][j]];
//             move[0] = move[0].split(",");
//             move[0][1] = parseInt(move[0][1]); move[0][0] = parseInt(move[0][0]);
//             // console.log('inner loop');
//             board.movePiece(board.board[move[0]], board.board[move[1]]);
//             const score = scorePosition(board.currentPieces);
//             board = dupBoard(dupedBoard); // revert state to before a move was made
//             // board.reverseMove();
//             console.log('score: ', score);
//             if (score < highestVal) {
//                 highestVal = score;
//                 bestMove = move;
//             }
//         }
//     }
//     return bestMove;
// }

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

function scorePosition(pieces) {
    const piecesArr = Object.values(pieces);
    // const piecesKeys = Object.keys(pieces);
    // console.log('piecesArrVals: ', piecesArr);
    // console.log('piecesArrKeys: ', piecesKeys);
    let points = 0;
    // let pieces = Object.values(board.currentPieces);
    for (let i = 0; i < piecesArr.length; i++) {
        switch (piecesArr[i].color) {
            case 'white':
                points += pieceTypePointsCase(piecesArr[i]);
                break;
            case 'black':
                points -= pieceTypePointsCase(piecesArr[i]);
                break;
            default:
                console.log('color does not exist: ', piecesArr[i].color);
        }
    }
    return points;
}

function pieceTypePointsCase(piece) {
    switch (piece.symbol) {
        case 'P':
            return 10;
        case 'R':
            return 50;
        case 'N':
            return 35;
        case 'B':
            return 35;
        case 'Q':
            return 100;
        case 'K': // add castling and restrictions on moving near enemy kings
            return 1000;
        default:
            console.log('that piece doesn\'t exist');
            console.log(`that piece is: ${piece} -> in ai code`)
            return;
    }
}


// this.board = {};
// this.whiteCaptures = [];
// this.blackCaptures = [];
// this.currentPieces = {};
// this.kings = {};
// this.kings['white'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
// this.kings['black'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
// this.currentTurnColor = 'white';
// this.moves = "";
// this.movesFor = { 'white': {}, 'black': {} }; // refactored to { 'white': { piece.pos: [moves] } } and remove from piece object


export default findAiMove;