import * as FriendApiUtil from '../util/friend_api_util';

export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

const receiveFriends = (friends) => {
    return {
        type: RECEIVE_FRIENDS,
        friends,
    }
}

const receiveFriend = (friend) => {
    return {
        type: RECEIVE_FRIEND,
        friend,
    }
}

const removeFriend = (friendId) => {
    return {
        type: REMOVE_FRIEND,
        friendId,
    }
}

export const fetchFriends = () => dispatch => {
    return FriendApiUtil.fetchFriends()
        .then((friends) => dispatch(receiveFriends(friends)))
}

export const fetchFriend = (friendId) => dispatch => {
    return FriendApiUtil.fetchFriend(friendId)
        .then((friend) => dispatch(receiveFriend(friend)))
}

export const createFriend = (friend) => dispatch => {
    return FriendApiUtil.createFriend(friend)
        .then((friend) => dispatch(receiveFriend(friend)))
}

export const deleteFriend = friendId => dispatch => {
    return FriendApiUtil.deleteFriend(friendId)
        .then(() => dispatch(removeFriend(friendId)))
}