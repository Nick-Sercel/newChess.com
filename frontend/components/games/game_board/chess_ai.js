export const makeAiMove = (board, color, depth) => {

}

function findAiMove (board, color, depth, max = true, alpha = -100000, beta = 100000) {

    if (depth === 0) {
        return scorePosition(board);
    }

    for (let i = 0; i < board.movesFor[color].length; i++) {
        board.movePiece();


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


// this.board = [];
// this.whiteCaptures = [];
// this.blackCaptures = [];
// this.currentPieces = {};
// this.kings = {};
// this.kings['white'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
// this.kings['black'] = { 'piece': null, 'direct': {}, 'indirect': {}, 'saves': {} };
// this.currentTurnColor = 'white';
// this.moves = "";
// this.movesFor = { 'white': [], 'black': [] };