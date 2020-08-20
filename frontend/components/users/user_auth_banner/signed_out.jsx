import React from 'react';
import {Link} from 'react-router-dom';
import CreateUserContainer from '../create_user_form_container';
import LoginUserContainer from '../../session/login_container';

class SignedOut extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(actionType) {
        if (actionType === 'new') {
            document.getElementById('create').classList.add('active-form')
        } else {
            document.getElementById('login').classList.add('active-form')
        }
    }

    render() {
        return (
            <div>
                <div className='user-auth-banner-links'>
                    {/* <li><Link to={`/users/new`}>Create New User</Link></li>
                    <li><Link to={`/session/new`}>Login</Link></li> */}
                    <li><a><button onClick={() => this.click('new')}>Create New User</button></a></li>
                    <li><a><button onClick={() => this.click('login')}>Login</button></a></li>
                </div>
                <CreateUserContainer />
                <LoginUserContainer />
            </div>
        )
    }
}

export default SignedOut;