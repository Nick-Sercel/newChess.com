import { LOGOUT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const _nullSession = {
    currentUser: null
};

export default (state = _nullSession, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            const currentUser = action.user
            return Object.assign({}, {id: currentUser.id});
        case LOGOUT_USER:
            return _nullSession;
        default:
            return state;
    }
};