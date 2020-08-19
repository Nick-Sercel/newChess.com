import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return (
        {
        loggedIn: Boolean(state.session.currentUser),
        currentUser: state.session.currentUser,
})};

const Auth = ({ component: Component, path, loggedIn, currentUser }) => {
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
            loggedIn ? <Component {...props} /> : <Redirect to="/users/new" />
        )}
    />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, undefined)(Protected));
