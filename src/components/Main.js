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
            loggedIn: auth.loggedIn(),
            menuActive: false
        }
    }

    toggleMenu() {
        this.setState({
            menuActive: !this.state.menuActive
        })
    }

    updateAuth(status) {
        status.loggedIn ? this.props.router.push('/dashboard') : this.props.router.push('/login');
        this.setState({
          loggedIn: status.loggedIn
        });
    }

    componentWillMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.login();
    }

    render() {
        let active = this.state.menuActive ? 'active' : '';
        return (
            <div className="business-portal-container">
                <Header 
                    className={active}
                    toggleActive={this.toggleMenu.bind(this)}
                    loggedIn={this.state.loggedIn} 
                    logout={auth.logout.bind(auth, null)} 
                    business={this.props.business}/>
                <main className="content">
                    { this.props.children }
                </main>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Main);