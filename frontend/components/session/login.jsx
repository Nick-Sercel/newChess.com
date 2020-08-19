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
        this.props.login(this.state);
    }

    render() {
        return (
            <div>
                <h2>Sign In</h2>
                <form>
                    <label>Username:
                        <input type="text" value={this.state.username} onChange={this.update('username')} />
                    </label>
                    <label>Password:
                        <input type="password" value={this.state.password} onChange={this.update('password')} />
                        <button onClick={this.handleSubmit}>Log In!</button>
                    </label>
                </form>
            </div>
        );
    }
}

export default Login;