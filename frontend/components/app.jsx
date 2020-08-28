import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

import {AuthRoute, ProtectedRoute} from '../util/route_util';

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';

import GameBoardContainer from './games/game_board/game_container';

// import CreateGoalContainer from './goals/create_goal_container';
// import EditGoalContainer from './goals/edit_goal_container';
// import GoalIndexContainer from './goals/goal_index_container';

import SplashContainer from './splash/splash_page_container';

import UserBannerContainer from './users/user_auth_banner/user_auth_banner_container';

const App = () => (
    <div>
        <UserBannerContainer />
        <Switch>
            <ProtectedRoute exact path="/game/new" component={GameBoardContainer} />
            {/* <AuthRoute path='/users/:userId/goals/new' component={CreateGoalContainer} />
            <AuthRoute path='/users/:userId/goals/:goalId/edit' component={EditGoalContainer} />
            <AuthRoute path='/users/:userId/goals/:goalId' component={GoalIndexContainer} />*/ }
            <ProtectedRoute path="/users/:userId/edit" component={EditUserFormContainer} />
            <Route path="/users/:userId/external" component={UserShowContainer} />
            <ProtectedRoute path="/users/:userId" component={UserShowContainer} />
            <Route path="/" component={SplashContainer} />
        </Switch>
        <Link to='/'>Return to Home Page</Link>
    </div>
);

export default App;

// Heroku logs -t

// Questions:

// nested connect props => friends list

// how to force re-render

// goals/friends/games only viewable for currentUser's things