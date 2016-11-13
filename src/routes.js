import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Main from './components/Main';

const Routes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
    </Router>
)

export default Routes;