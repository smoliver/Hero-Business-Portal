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
            business: null
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

    componentDidMount() {
        let that = this;
        fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.getToken()}`
            }
        }).then(response => response.json())
        .then(stats => {
            // If the average customer spent is not defined
            // Sets it to a default value of $20.00
            // updates the value on the server
            let business = stats;
            if (business['avg_customer_spent'] === undefined) {
                business['avg_customer_spent'] = 20.00;
            }

            // If the average party size is not defined
            // Sets it to a default value of 1
            // Updates the value on the server
            let partySize = stats['avg_party_size'];
            if (business['avg_party_size'] === undefined) {
                business['avg_party_size'] = 1;
            }
            updateBusiness(business);
        });
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