import '../styles/style.scss';

import React from 'react';
import { withRouter } from 'react-router';

import Header from './Header';
import Footer from './Footer';
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
        });
    }

    componentWillMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.login();
    }

    render() {
        return (
            <div className="business-portal-container">
                <Header loggedIn={this.state.loggedIn} logout={auth.logout.bind(auth, null)} />
                <main className="content">
                    { this.props.children }
                </main>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Main);