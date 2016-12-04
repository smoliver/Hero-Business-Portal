import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Main from './components/Main';
import Dashboard from './components/dashboard/Dashboard';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import ProfileContainer from './components/profile/ProfileContainer';

class Routes extends React.Component {
    constructor() {
        super();

        this.createElement = this.createElement.bind(this);
    }


    createElement(Component, props) {
        return (
            <Component
                business={this.props.business}
                onLogin={this.props.onLogin}
                onUpdateBusiness={this.props.onUpdateBusiness}
                onUpdateBusinessImage={this.props.onUpdateBusinessImage}
                request={this.props.request}
                {...props} />
        );
    }

    render() {
        return(
            <Router history={hashHistory} createElement={this.createElement}>
                <Route path="/" component={Main}>
                    <Route path="dashboard" component={Dashboard} />
                    <Route path="signup" component={SignUp} />
                    <Route path="login" component={LogIn} />
                    <Route path="profile" component={ProfileContainer} />
                </Route>
            </Router>
        )
    }
}

export default Routes