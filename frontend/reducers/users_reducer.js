import {
    RECEIVE_USER,
    RECEIVE_USER_SESSIONLESS,
    REMOVE_USER,
} from '../actions/user_actions';

const UsersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_USER:
            newState[action.user.id] = action.user;
            return newState;
        case RECEIVE_USER_SESSIONLESS:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return oldState;
    }
}

export default UsersReducer;