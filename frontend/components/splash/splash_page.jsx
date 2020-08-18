import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {

    render () {
        return (
            <div>
                <Link to={`/users/new`}>Create New User</Link>
                <p>


                    
                </p>
                <Link to={`/session/new`}>Returning User? Login</Link>
            </div>
        )
    }
}

export default SplashPage;