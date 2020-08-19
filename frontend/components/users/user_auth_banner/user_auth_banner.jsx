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
        if (this.id) {
            renderedComponent = <SignedIn logout={this.props.logout} currentUser={this.props.currentUser} />;
        } else {
            renderedComponent = <SignedOut login={this.props.login} />;
        }
        return (
            <div id='user-auth-banner'>
                <p className='user-auth-banner-title'>Chess with Friends</p>
                {
                    renderedComponent
                }
            </div>
        )
    }
}

export default UserAuthBanner;