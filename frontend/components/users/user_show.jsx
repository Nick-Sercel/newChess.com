import React from 'react';
import { Link } from 'react-router-dom';
// import GoalIndexContainer from '../goals/goal_index_container';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user) {
            console.log(`sessionId: ${this.props.currentUserId}`);
            console.log(`userId: ${this.props.user.id}`);
        }
        if (!this.props.user || this.props.currentUserId !== this.props.user.id) {
            this.props.fetchUserSessionless(this.props.match.params.userId);
        } else {
            this.props.fetchUser(this.props.match.params.userId);
        }
    }

    render() {
        if (!this.props.user) { return(<div></div>) }

        let loggedInContent = <div></div>;
        let email = <div></div>;
        let loggedOutContent = <div></div>
        if (this.props.currentUserId === this.props.user.id) {
            loggedInContent = <div>
                                <Link to='/game/new'>Play a Game</Link>
                                <Link to={`/users/${this.props.user.id}/edit`}>Edit User Information</Link>
                              </div>;
            email = <h2>{this.props.user.email}</h2>;
        } else {
            loggedOutContent = <Link to={`/`}>Return to Home Page</Link>
        }
        
        return (
            <div>
                <h1>{this.props.user.username}</h1>
                {email}
                <h3>{this.props.user.elo}</h3>
                {loggedInContent}
                {loggedOutContent}
            </div>
        )
    }
}

export default UserShow;