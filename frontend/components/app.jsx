import React from "react";
import { Route, Switch } from "react-router-dom";

import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_user_form_container';

const App = () => (
    <div>
        <h1>React 1</h1>
        <Switch>
            <Route path="/users/:userId/edit" component={EditUserFormContainer} />
            <Route path="/users/:userId" component={UserShowContainer} />
        </Switch>
    </div>
);

export default App;