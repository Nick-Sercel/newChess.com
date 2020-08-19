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

import UserBannerContainer from './users/user_auth_banner/user_auth_banner_container';

const App = () => (
    <div>
        {/* <h1>Play Chess With Friends!</h1> */}
        <UserBannerContainer />
        <Switch>
            <ProtectedRoute exact path="/users/new" component={CreateUserFormContainer} />
            <Route exact path="/game/new" component={GameBoardContainer} />
            <ProtectedRoute exact path="/session/new" component={LoginFormContainer} />
            <AuthRoute path="/users/:userId/edit" component={EditUserFormContainer} />
            <AuthRoute path="/users/:userId" component={UserShowContainer} />
            <Route path="/" component={Splash} />
        </Switch>
        <Link to='/'>Return to Splash Page</Link>
    </div>
);

export default App;