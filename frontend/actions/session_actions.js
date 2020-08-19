import { deleteSession, postSession } from '../util/session_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_CURRENT_USER';

const receiveUser = user => ({
    type: RECEIVE_USER,
    user,
});

const logoutCurrentUser = () => ({
    type: LOGOUT_USER,
});

export const login = formUser => dispatch => postSession(formUser)
    .then(user => dispatch(receiveUser(user)));

export const logout = () => dispatch => deleteSession()
    .then(() => dispatch(logoutCurrentUser()));
