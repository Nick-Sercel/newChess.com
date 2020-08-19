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
        this.props.action(this.state)
            .then(this.props.history.push(`/users/${this.props.match.params.userId}`))
    }

    render() {
        return (
            <div>
                <form>
                    <h1>{this.props.formType}</h1>
                    <label>
                        Username: <input type='text' value={this.state.username} onChange={this.update('username')} />
                    </label>
                    <label>
                        Email: <input type='text' value={this.state.email} onChange={this.update('email')} />
                    </label>
                    <label>
                        Password: <input type='text' onChange={this.update('password')} />
                        <button onClick={this.handleSubmit}>Sign Up!</button>
                    </label>
                </form>
            </div>
        )
    }
}

export default withRouter(UserForm);