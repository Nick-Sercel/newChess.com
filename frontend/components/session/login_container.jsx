import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Login from './login';

const mSTP = state => ({
    user: {
        username: '',
        password: '',
    }
})

const mDTP = dispatch => ({
    login: formUser => dispatch(login(formUser)),
});

export default connect(mSTP, mDTP)(Login);
