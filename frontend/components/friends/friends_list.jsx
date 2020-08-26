import React from 'react';
// import {connect} from 'react-redux';
import FriendIndexItem from './friends_list_item';
import FriendSearch from './friend_search';

class FriendIndex extends React.Component {
    componentDidMount() {
        this.props.fetchFriends();
    }

    render() {
        return (
            <div className={'index-container friend-index-container'}>
                <li><p>Friends</p></li>
                <FriendSearch createFriend={this.props.createFriend} />
                {
                    this.props.friends.map(friend => <FriendIndexItem key={friend.id} friend={friend} deleteFriend={this.props.deleteFriend} />)
                }
            </div>
        )
    }
}

export default FriendIndex;




// export default connect(mSTP, mDTP)(FriendIndex);