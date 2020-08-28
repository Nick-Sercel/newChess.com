import React from 'react';
import { connect } from 'react-redux';
import UserForm from './user_form';
import { fetchUser, updateUser } from '../../actions/user_actions';

class EditUserForm extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.sessionId);
    }

    render() {
        const { action, formType, user } = this.props;
        if (!user) return null;
        return (
            <UserForm action={action} sessionId={this.props.sessionId} formType={formType} user={user} />
        );
    }
}

const mSTP = (state) => ({
    user: state.entities.users[state.session.id],
    formType: 'Update User',
    formClassName: 'update',
    sessionId: state.session.id,
})

const mDTP = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    action: (user) => dispatch(updateUser(user)),
})

export default connect(mSTP, mDTP)(EditUserForm);