import React from 'react';

import Header from './Header';
import auth from '../auth';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: auth.loggedIn()
        }
    }

    updateAuth(loggedIn) {
        this.setState({
          loggedIn
        })
    }

    componentWillMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.login()
    }

    render() {
        return (
            <div>
                <Header title={'Bizness Portal'} />
                { this.props.children }
            </div>
        )
    }
}

export default Main;