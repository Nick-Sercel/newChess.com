import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

import {AuthRoute, ProtectedRoute} from '../util/route_util';

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';
import CreateUserFormContainer from './users/create_user_form_container';
import LoginFormContainer from './session/login_container';
import GameBoardContainer from './games/game_board_container';
import Splash from './splash/splash_page';

const App = () => (
    <div>
        <h1>Play Chess With Friends!</h1>
        <Switch>
            <ProtectedRoute exact path="/users/new" component={CreateUserFormContainer} />
            <Route exact path="/game/new" component={GameBoardContainer} />
            <ProtectedRoute exact path="/session/new" component={LoginFormContainer} />
            <AuthRoute path="/users/:userId/edit" component={EditUserFormContainer} />
            <AuthRoute path="/users/:userId" component={UserShowContainer} />
            <Route path="/" component={Splash} />
        </Switch>
        <p>


        </p>
        <Link to='/'>Return to Splash Page</Link>
        <p>


        </p>
        <Link to='/game/new'>Play a Game</Link>
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