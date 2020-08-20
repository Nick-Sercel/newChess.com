import React from 'react';
import SignedIn from './signed_in';
import SignedOut from './signed_out';

class UserAuthBanner extends React.Component {
    constructor(props) {
        super(props);
        this.id = null;
        if (this.props.session) {
            this.id = this.props.session.id
        }
    }

    render() {
        let renderedComponent;
        if (this.id || this.props.currentUser) {
            renderedComponent = <SignedIn logout={this.props.logout} currentUser={this.props.currentUser} />;
        } else {
            renderedComponent = <SignedOut login={this.props.login} />;
        }
        return (
            <div id='user-auth-banner-container'>
                <li className='user-auth-banner-title'>Chess with Friends</li>
                <nav id='user-auth-banner'>
                    {renderedComponent}
                </nav>
            </div>
        )
    }
}

export default UserAuthBanner;