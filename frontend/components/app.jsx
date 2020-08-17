import React from "react";
import { Route, Switch } from "react-router-dom";

import PostIndexContainer from "./posts/post_index_container";
import UserShowContainer from './users/user_show_container';
import EditUserFormContainer from './users/edit_post_form_container';

const App = () => (
    <div>
        <h1>React 1</h1>
        <Switch>
            <Route exact path="/" component={PostIndexContainer} />
            <Route exact path="/posts/:postId" component={UserShowContainer} />
            <Route path="/posts/:postId/edit" component={EditUserFormContainer} />
        </Switch>
    </div>
);

export default App;