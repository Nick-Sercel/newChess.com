import React from 'react';

class FriendIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.centralUsername = this.props.friend.central_username;
        this.foreignUsername = this.props.friend.foreign_username;
    }

    friendRequest(type) {
        switch (type) {
            case 'accept':
                this.props.friend.accepted = true;
            case 'deny':
                this.props.deleteFriend(this.props.friend.id);
        }
    }

    render() {
        let userDisp = <div></div>
        let statusDisp = <div></div>;
        if (!this.props.friend.accepted) {
            if (this.props.sessionId === this.centralUser.id) {
                statusDisp = <li><p>Pending</p></li>
            } else {
                statusDisp = <div>
                    <li><button onClick={this.friendRequest('accept')} >Accept</button></li>
                    <li><button onClick={this.friendRequest('deny')} >Decline</button></li>
                </div>
            }
        }
        userDisp = <div>
                        <li><p>{this.centralUsername}</p></li>
                        <li><p>{this.foreignUsername}</p></li>
                        {statusDisp}
                   </div>

        return (
            <div className={'item-container friend-item-container'}>
                {userDisp}
            </div>
        )
    }
}

export default FriendIndexItem;