import {
    RECEIVE_FRIENDS,
    RECEIVE_FRIEND,
    REMOVE_FRIEND,
} from '../actions/friend_actions';

const FriendsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_FRIENDS:
            return Object.assign({}, action.friends);
        case RECEIVE_FRIEND:
            newState[action.friend.id] = action.friend;
            return newState;
        case REMOVE_FRIEND:
            delete newState[action.friendId];
            return newState;
        default:
            return oldState;
    }
}

export default FriendsReducer;