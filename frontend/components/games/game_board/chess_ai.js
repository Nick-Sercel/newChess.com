export const makeAiMove = (board, color, depth) => {

    // board duplication if possible
    // boarddd = new Board();
    // boarddd.properties = Object.assign({}, board.properties);

    findAiMove(board, color, depth);
}

function findAiMove (board, color, depth, max = true, alpha = -100000, beta = 100000) {

    if (depth === 0) {
        return scorePosition(board);
    }

    const entities = Object.entries(board.movesFor[color]); // [ [ [0, 1], [ [2, 3], [3, 4], [] ] ], [  ], [  ] ]
    for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < entities[i][1]; j++) {
            board.movePiece(board.board[entities[i][0]], board.board[entities[i][1][j]]);
            findAiMove(board, board.oppColor(color), depth - 1, !max, alpha, beta);
        }

    }


}

function scorePosition(pieces) {
    let points = 0;
    // let pieces = Object.values(board.currentPieces);
    for (let i = 0; i < pieces.length; i++) {
        switch (pieces[i].color) {
            case 'white':
                points += pieceTypePointsCase(pieces[i]);
            case 'black':
                points -= pieceTypePointsCase(pieces[i]);
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