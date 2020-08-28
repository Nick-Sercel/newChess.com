import React from 'react';
import { Link } from 'react-router-dom';
import EditUserContainer from './edit_user_form_container';

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

    toggleEditPage() {
        document.getElementById('create').classList.add('active-form')
    }

    render() {
        if (!this.props.user) { return(<div></div>) }

        let loggedInContent = <div></div>;
        let email = <div></div>;
        let loggedOutContent = <div></div>
        if (this.props.currentUserId === this.props.user.id) {
            loggedInContent = <div>
                                <li className='button-format'><Link to='/game/new'>Play a Game</Link></li>
                                <p>

                                </p>
                                <button onClick={() => this.toggleEditPage()}>Edit User Information</button>
                              </div>;
            email = <h2>{this.props.user.email}</h2>;
        } else {
            loggedOutContent = <div></div>
        }
        
        return (
            <div>
                <h1>{this.props.user.username}</h1>
                {email}
                <h3>Elo: {this.props.user.elo}</h3>
                {loggedInContent}
                {loggedOutContent}
                <EditUserContainer />
            </div>
        )
    }
}

export default UserShow;