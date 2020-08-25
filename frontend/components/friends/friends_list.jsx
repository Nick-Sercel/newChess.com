import React from 'react';
import FriendIndexItem from './friends_list_item';

class FriendIndex extends React.Component {
    componentDidMount() {
        this.props.fetchFriends();
    }

    render() {
        return (
            <div className={'index-container friend-index-container'}>
                <li><p>Friends</p></li>
                {
                    this.props.friends.map(friend => <FriendIndexItem friend={friend} fetchUser={this.props.fetchUser} deleteFriend={this.props.deleteFriend} />)
                }
            </div>
        )
    }
}

export default FriendIndex;