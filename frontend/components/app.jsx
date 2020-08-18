import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';
import CreateUserFormContainer from './users/create_user_form_container';
import LoginFormContainer from './session/login_container';
import Splash from './splash/splash_page';

const App = () => (
    <div>
        <h1>Play Chess With Friends!</h1>
        <Switch>
            <Route path="/users/new" component={CreateUserFormContainer} />
            <Route path="/users/:userId/edit" component={EditUserFormContainer} />
            <Route path="/users/:userId" component={UserShowContainer} />
            <Route path="/session/new" component={LoginFormContainer} />
            <Route path="/" component={Splash} />
        </Switch>
        <p>


            
        </p>
        <Link to='/'>Return to Splash Page</Link>
    </div>
);

export default App;