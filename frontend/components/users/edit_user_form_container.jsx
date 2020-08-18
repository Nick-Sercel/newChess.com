import React from 'react';
import { connect } from 'react-redux';
import UserForm from './user_form';
import { fetchUser, updateUser } from '../../actions/user_actions';

class EditUserForm extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    render() {
        const { action, formType, user } = this.props;
        if (!user) return null;
        return (
            <UserForm
                action={action}
                formType={formType}
                user={user} />
        );
    }
}

const mSTP = (state, ownProps) => ({
    user: state.users[ownProps.match.params.userId],
    formType: 'Update User',
})

const mDTP = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    action: (user) => dispatch(updateUser(user)),
})

export default connect(mSTP, mDTP)(EditUserForm);