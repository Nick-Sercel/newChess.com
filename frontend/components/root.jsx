import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';
import UserShowContainer from './users/user_show_container';

const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App store={store} />
        </HashRouter>
    </Provider>
);

export default Root;