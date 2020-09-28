import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SignedOut extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        this.props.logout();
        // this.props.history.push('/');
    }

    showPage() {
        this.props.history.push(`/users/${this.props.currentUser.id}`);
    }



    render() {
        return (
            <div className='user-auth-banner-links'>
                <li><a target='_blank' href='https://www.linkedin.com/in/nick-sercel-4402261a0/'>LinkedIn</a></li>
                <li><a target="_blank" href='https://github.com/Jim-Heftypants/newChess.com'>Github</a></li>
                <li><a className='clickable' onClick={() => this.showPage()}>{`${this.props.currentUser.username}`}</a></li>
                <li><a className='clickable' onClick={() => this.click()}>Logout</a></li>
            </div>
        )
    }
}

export default withRouter(SignedOut);