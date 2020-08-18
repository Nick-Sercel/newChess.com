import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user,
    }
}

const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId,
    }
}

export const fetchUser = (userId) => dispatch => {
    return UserApiUtil.fetchUser(userId)
        .then((user) => dispatch(receiveUser(user)))
}

export const createUser = (user) => dispatch => {
    return UserApiUtil.createUser(user)
        .then((user) => dispatch(receiveUser(user)))
}

export const updateUser = (user) => dispatch => {
    return UserApiUtil.updateUser(user)
        .then((user) => dispatch(receiveUser(user)))
}

export const deleteUser = userId => dispatch => {
    return UserApiUtil.deleteUser(userId)
        .then(() => dispatch(removeUser(userId)))
}