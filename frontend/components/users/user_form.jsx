import React from 'react';
import {withRouter} from 'react-router-dom';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasErrors = false;
    }

    update(formType) {
        return e => {
            this.setState({ [formType]: e.currentTarget.value });
        }
    }

    handleSubmit() {
        this.props.action(this.state)
        if (this.props.sessionId) {
            this.hasErrors = false;
            this.toggleShow();
        } else {
            this.hasErrors = true;
            this.setState({ password: '' });
        }
            // .then(() => this.props.history.push(`/users/${this.props.match.params.userId}`))
    }

    toggleShow() {
        document.getElementById('create').classList.remove('active-form')
    }

    render() {
        let errorShow = <div></div>;
        if (this.hasErrors) {
            errorShow = <li><p>Invalid Username, Email, or Password</p></li>
        }
        return (
            <div id='create' className={`overlay-form ${this.props.formClassName}`}>
                <div className='close-btn' onClick={() => this.toggleShow()}>&times;</div>
                <h1>{this.props.formType}</h1>
                {errorShow}
                <div className='form-element'>
                    <label>Username:</label>
                    <input type='text' value={this.state.username} onChange={this.update('username')} />
                </div>
                <div className='form-element'>
                    <label>Email:</label>
                    <input type='email' value={this.state.email} onChange={this.update('email')} />
                </div>
                <div className='form-element'>
                    <label>Password:  (6 character minimum)</label>
                    <input type='text' onChange={this.update('password')} />
                </div>
                <div className='form-element'>
                    <button onClick={this.handleSubmit}>{this.props.formType}</button>
                </div>
            </div>
        )
    }
}

export default withRouter(UserForm);