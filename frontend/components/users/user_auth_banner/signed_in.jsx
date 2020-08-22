import React from 'react';
import { withRouter } from 'react-router-dom';

class SignedOut extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        this.props.logout();
        this.props.history.push('/');
    }

    showPage() {
        this.props.history.push(`/users/${this.props.currentUser.id}`);
    }

    render() {
        return (
            <div className='user-auth-banner-links'>
                <li><a><button onClick={() => this.showPage()}>{`${this.props.currentUser.username}`}</button></a></li>
                <li><a><button onClick={() => this.click()}>Logout</button></a></li>
            </div>
        )
    }
}

export default withRouter(SignedOut);