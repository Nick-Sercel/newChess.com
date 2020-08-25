import {connect} from 'react-redux';
import FriendsList from './friends_list';
import {fetchFriends, deleteFriend} from '../../actions/friend_actions';
import { fetchUser } from '../../actions/user_actions';

const mSTP = state => ({
    friends: Object.values(state.entities.friends),
})

const mDTP = dispatch => ({
    fetchFriends: () => dispatch(fetchFriends()),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
})

export default connect(mSTP, mDTP)(FriendsList)