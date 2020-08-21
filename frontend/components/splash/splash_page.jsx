import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {

    render () {
        return (
            <div className='splash-container'>
                <li><Link to={`/users/${this.props.currentUser.id}`}>User Page</Link></li>
                <li><Link to='/games/new'>Play a Game</Link></li>
            </div>
        )
    }
}

export default SplashPage;