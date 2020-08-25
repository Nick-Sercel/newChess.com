import {
    RECEIVE_GAMES,
    RECEIVE_GAME,
} from '../actions/game_actions';

const GamesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_GAMES:
            return Object.assign({}, action.games);
        case RECEIVE_GAME:
            newState[action.game.id] = action.game;
            return newState;
        default:
            return oldState;
    }
}

export default GamesReducer;