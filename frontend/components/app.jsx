import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

import {AuthRoute, ProtectedRoute} from '../util/route_util';

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';
import CreateUserFormContainer from './users/create_user_form_container';
import LoginFormContainer from './session/login_container';
import Splash from './splash/splash_page';

const App = () => (
    <div>
        <h1>Play Chess With Friends!</h1>
        <Switch>
            <AuthRoute path="/users/new" component={CreateUserFormContainer} />
            <ProtectedRoute path="/users/:userId/edit" component={EditUserFormContainer} />
            <ProtectedRoute path="/users/:userId" component={UserShowContainer} />
            <AuthRoute path="/session/new" component={LoginFormContainer} />
            <Route path="/" component={Splash} />
        </Switch>
        <p>



        </p>
        <Link to='/'>Return to Splash Page</Link>
    </div>
);

export default App;


// /
// Splash
//     / login
// SessionForm
//     / signup
// SessionForm
//     / users /: userId
// ProfileComponent
// GoalIndex
// GoalIndexItem
// FriendIndex
// FriendIndexItem
// GameIndex
// GameIndexItem
//     / goals / new
//         GoalForm
//     / goals /: goalId
// GoalShow
//     / goals /: goalsId / edit
// GoalForm
//     / game
// GameShow