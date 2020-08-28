import React from 'react';
import { Link } from 'react-router-dom';

class FriendIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.centralUsername = this.props.friend.central_username;
        this.foreignUsername = this.props.friend.foreign_username;
        this.state = { accepted: this.props.friend.accepted }
    }

    friendRequest(type) {
        switch (type) {
            case 'accept':
                this.props.friend.accepted = true
                this.props.updateFriend(this.props.friend);
                this.setState( { accepted: this.props.friend.accepted } );
                break;
            case 'deny':
                this.props.deleteFriend(this.props.friend.id);
                break;
        }
    }

    friendsPage() {
        // console.log('text');

    }

    render() {
        let userDisp = <div></div>
        let statusDisp = <div></div>;
        if (!this.props.friend.accepted) {
            // debugger;
            if (this.props.sessionId === this.props.friend.central_user_id) {
                statusDisp = <li className='no-decoration'><p>Pending</p></li>
            } else {
                statusDisp = <div>
                    <li><button onClick={() => this.friendRequest('accept')} >Accept</button></li>
                    <li><button onClick={() => this.friendRequest('deny')} >Decline</button></li>
                </div>
            }
        }
        if (this.props.sessionId !== this.props.friend.central_user_id) {
            userDisp = <div className='friend-item'>
                            <li><Link to={`/users/${this.props.friend.central_user_id}/external`}>{this.foreignUsername}</Link></li>
                            {statusDisp}
                        </div>
        } else {
            userDisp = <div className='friend-item'>
                            <li><Link to={`/users/${this.props.friend.foreign_user_id}/external`}>{this.centralUsername}</Link></li>
                            {statusDisp}
                        </div>
        }


        return (
            <div className={'item-container friend-item-container'}>
                {userDisp}
            </div>
        )
    }
}

export default FriendIndexItem;