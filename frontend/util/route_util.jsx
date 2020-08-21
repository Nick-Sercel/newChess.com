import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    // debugger;
    return (
        {
        loggedIn: Boolean(state.session.currentUser),
        currentUser: state.session.currentUser,
        // currentUserId: state.session.id,
})};

const Auth = ({ component: Component, loggedIn, path, currentUser }) => {
    return (
        <Route
            path={path}
            render={props => (
                loggedIn ? <Redirect to={`/users/${currentUser.id}`} /> : <Component {...props} />
            )}
        />
    )
};

const Protected = ({ component: Component, path, loggedIn }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to='/' />
        )}
    />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
