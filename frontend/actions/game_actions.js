import * as GameApiUtil from '../util/game_api_util';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const RECEIVE_GAME = 'RECEIVE_GAME';

const receiveGames = (games) => {
    return {
        type: RECEIVE_GAMES,
        games,
    }
}

const receiveGame = (game) => {
    return {
        type: RECEIVE_GAME,
        game,
    }
}

export const fetchGames = () => dispatch => {
    return GameApiUtil.fetchGames()
        .then((games) => dispatch(receiveGames(games)))
}

export const fetchGame = (gameId) => dispatch => {
    return GameApiUtil.fetchGame(gameId)
        .then((game) => dispatch(receiveGame(game)))
}

export const createGame = (game) => dispatch => {
    return GameApiUtil.createGame(game)
        .then((game) => dispatch(receiveGame(game)))
}