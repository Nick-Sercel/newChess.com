import React from 'react';
import {Link} from 'react-router-dom';

class SignedOut extends React.Component {
    render() {
        return (
            <div className='user-auth-banner-links'>
                <Link to={`/users/new`}>Create New User</Link>
                <p> or </p>
                <Link to={`/session/new`}>Login</Link>
            </div>
        )
    }
}

export default SignedOut;