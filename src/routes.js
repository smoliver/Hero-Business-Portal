import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Main from './components/Main';
import Dashboard from './components/dashboard/Dashboard';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';

class Routes extends React.Component {
    constructor() {
        super();

        this.createElement = this.createElement.bind(this);
    }


    createElement(Component, props) {
        console.log("Routes Business");
        console.log(this.props.business);
        return <Component {...props} business={this.props.business} onUpdateBusiness={this.props.onUpdateBusiness} />
    }

    render() {
        return(
            <Router history={hashHistory} createElement={this.createElement}>
                <Route path="/" component={Main}>
                    <Route path="dashboard" component={Dashboard} />
                    <Route path="signup" component={SignUp} />
                    <Route path="login" component={LogIn} />
                </Route>
            </Router>
        )
    }
}

export default Routes