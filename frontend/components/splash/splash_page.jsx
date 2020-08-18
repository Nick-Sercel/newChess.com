import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {

    render () {
        return (
            <div>
                <Link to={`/users/new`}>Create New User</Link>
            </div>
        )
    }
}

export default SplashPage;