import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

import {AuthRoute, ProtectedRoute} from '../util/route_util';

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';
import CreateUserFormContainer from './users/create_user_form_container';
import LoginFormContainer from './session/login_container';

import GameBoardContainer from './games/game_board_container';

import CreateGoalContainer from './goals/create_goal_container';
import EditGoalContainer from './goals/edit_goal_container';
import GoalIndexContainer from './goals/goal_index_container';

import SplashContainer from './splash/splash_page_container';

import UserBannerContainer from './users/user_auth_banner/user_auth_banner_container';

const App = () => (
    <div>
        <UserBannerContainer />
        <Switch>
            <ProtectedRoute exact path="/users/new" component={CreateUserFormContainer} />
            <ProtectedRoute exact path="/session/new" component={LoginFormContainer} />
            <Route exact path="/game/new" component={GameBoardContainer} />
            <AuthRoute path='/users/:userId/goals/new' component={CreateGoalContainer} />
            <AuthRoute path='/users/:userId/goals/:goalId/edit' component={EditGoalContainer} />
            <AuthRoute path='/users/:userId/goals/:goalId' component={GoalIndexContainer} />
            <AuthRoute path="/users/:userId/edit" component={EditUserFormContainer} />
            <AuthRoute path="/users/:userId" component={UserShowContainer} />
            <Route path="/" component={SplashContainer} />
        </Switch>
        <Link to='/'>Return to Splash Page</Link>
    </div>
);

export default App;