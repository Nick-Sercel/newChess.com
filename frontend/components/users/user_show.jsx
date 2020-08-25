import React from 'react';
import { Link } from 'react-router-dom';
// import GoalIndexContainer from '../goals/goal_index_container';

class UserShow extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    render() {
        return (
            <div>
                <h1>{this.props.user.username}</h1>
                <h2>{this.props.user.email}</h2>
                <h3>{this.props.user.elo}</h3>
                <Link to='/game/new'>Play a Game</Link>
                {/* <GoalIndexContainer /> */}
                {/* <Link to={`/users/${this.props.user.id}/goals/new`} >Create a new Goal</Link> */}
                {/* <Link to={`/users/${this.props.user.id}/goals/${this.props.user.goals[].id}`} >Edit a Goal</Link> */}
                <Link to={`/users/${this.props.user.id}/edit`}>Edit User Information</Link>
            </div>
        )
    }
}

export default UserShow;