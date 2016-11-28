import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import BusinessLogic from './BusinessLogic'
import rules from './validation/rules';
import auth from './auth';

const App = () => (
    <BusinessLogic />
)

ReactDOM.render(<App />, document.getElementById('business-portal'));