import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Login from './login';
// import UserForm from '../users/user_form';

const mSTP = state => ({
    user: {
        username: '',
        password: '',
    },
    formType: 'Login!',
    formClassName: 'login',
    sessionId: state.session.id,
})

const mDTP = dispatch => ({
    login: formUser => dispatch(login(formUser)),
});

export default connect(mSTP, mDTP)(Login);
