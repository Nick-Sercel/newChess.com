import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.toggleShow();
        this.props.login(this.state);
    }

    toggleShow() {
        // add class 'activeForm'
        document.getElementById('login').classList.remove('active-form')
    }

    render() {
        return (
            <div id='login' className={`overlay-form ${this.props.formClassName}`}>
                <div className='close-btn' onClick={() => this.toggleShow()}>&times;</div>
                <h1>{this.props.formType}</h1>
                <div className='form-element'>
                    <label>Username:</label>
                    <input type='text' value={this.state.username} onChange={this.update('username')} />
                </div>
                <div className='form-element'>
                    <label>Password:</label>
                    <input type='password' onChange={this.update('password')} />
                </div>
                <div className='form-element'>
                    <button onClick={this.handleSubmit}>{this.props.formType}</button>
                </div>
            </div>
        )
    }
}

export default Login;