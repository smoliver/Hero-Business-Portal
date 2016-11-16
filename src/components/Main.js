import React from 'react';
import { withRouter } from 'react-router';

import Header from './Header';
import auth from '../auth';

class Main extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loggedIn: auth.loggedIn()
        }
    }

    updateAuth(loggedIn) {
        loggedIn ? this.props.router.push('/dashboard') : this.props.router.push('/login');
        this.setState({
          loggedIn
        })
    }

    componentWillMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.login();
    }

    render() {
        return (
            <div>
                <Header title={'Bizness Portal'} logout={auth.logout.bind(auth, null)} />
                { this.props.children }
            </div>
        )
    }
}

export default withRouter(Main);