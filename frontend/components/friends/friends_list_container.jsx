import {connect} from 'react-redux';
import FriendsList from './friends_list';
import {fetchFriends, deleteFriend, createFriend, updateFriend} from '../../actions/friend_actions';

const mSTP = state => {
    let sessionId;
    if (state.session) {
        sessionId = state.session.id;
    }
    return ({
        friends: Object.values(state.entities.friends),
        sessionId: sessionId,
    })
}

const mDTP = dispatch => ({
    fetchFriends: () => dispatch(fetchFriends()),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
    createFriend: (friend) => dispatch(createFriend(friend)),
    updateFriend: (friend) => dispatch(updateFriend(friend)),
})

export default connect(mSTP, mDTP)(FriendsList)