import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasErrors = false;
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
        if (this.props.sessionId) {
            this.hasErrors = false;
            this.toggleShow();
        } else {
            this.hasErrors = true;
            this.setState({ password: '' });
        }
    }

    toggleShow() {
        document.getElementById('login').classList.remove('active-form')
    }

    render() {
        let errorShow = <div></div>;
        if (this.hasErrors) {
            errorShow = <li><p>Invalid Username or Password</p></li>
        }
        return (
            <div id='login' className={`overlay-form ${this.props.formClassName}`}>
                <div className='close-btn' onClick={() => this.toggleShow()}>&times;</div>
                <h1>{this.props.formType}</h1>
                {errorShow}
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