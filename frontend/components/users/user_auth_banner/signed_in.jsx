import React from 'react';

class SignedOut extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        this.props.logout();
    }

    render() {
        return (
            <div className='user-auth-banner-links'>
                <li><a>Welcome, {`${this.props.currentUser.username}`}</a></li>
                <li><a><button onClick={() => this.click()}>Logout</button></a></li>
            </div>
        )
    }
}

export default SignedOut;