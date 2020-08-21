import React from 'react';
import {withRouter} from 'react-router-dom';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(formType) {
        return e => {
            this.setState({ [formType]: e.currentTarget.value });
        }
    }

    handleSubmit() {
        this.toggleShow();
        this.props.action(this.state)
            // .then(() => this.props.history.push(`/users/${this.props.match.params.userId}`))
    }

    toggleShow() {
        // add class 'activeForm'
        document.getElementById('create').classList.remove('active-form')
    }

    render() {
        return (
            <div id='create' className={`overlay-form ${this.props.formClassName}`}>
                <div className='close-btn' onClick={() => this.toggleShow()}>&times;</div>
                <h1>{this.props.formType}</h1>
                <div className='form-element'>
                    <label>Username:</label>
                    <input type='text' value={this.state.username} onChange={this.update('username')} />
                </div>
                <div className='form-element'>
                    <label>Email:</label>
                    <input type='email' value={this.state.email} onChange={this.update('email')} />
                </div>
                <div className='form-element'>
                    <label>Password:</label>
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