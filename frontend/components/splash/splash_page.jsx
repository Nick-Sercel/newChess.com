import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {

    render () {
        let link = null;
        if (this.props.currentUser) {
            link = <Link to={`/users/${this.props.currentUser.id}`}>User Page</Link>
        }
        return (
            <div className='splash-container'>
                <li>{link}</li>
                <li><Link to='/games/new'>Play a Game</Link></li>
            </div>
        )
    }
}

export default SplashPage;