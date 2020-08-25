import React from 'react';

class FriendIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.centralUser;
        this.foreignUser;
    }

    componentDidMount() {
        this.centralUser = this.props.fetchUser(this.props.friend.central_user_id);
        this.foreignUser = this.props.fetchUser(this.props.friend.foreign_user_id);
        (this.props.friend.accepted) ? statusDisp = <div></div> : <li><p>Pending</p></li>
    }

    render() {
        let centralUserDisp;
        (this.centralUser) ? centralUserDisp = <li><p>{this.centralUser.username}</p></li> : centralUserDisp = <div></div>;
        let foreignUserDisp;
        (this.foreignUser) ? foreignUserDisp = <li><p>{this.foreignUser.username}</p></li> : foreignUserDisp = <div></div>;
        let statusDisp = <div></div>;

        return (
            <div className={'item-container friend-item-container'}>
                {centralUserDisp}
                {foreignUserDisp}
                {statusDisp}
            </div>
        )
    }
}

export default FriendIndexItem;