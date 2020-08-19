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
                <p>Welcome, {`${this.props.currentUser.username}`}</p>
                <button onClick={() => this.click()}>Logout</button>
            </div>
        )
    }
}

export default SignedOut;