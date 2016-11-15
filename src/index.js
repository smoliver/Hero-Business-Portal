import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import rules from './validation/rules';

const App = () => (
    <Routes />
)

ReactDOM.render(<App />, document.getElementById('business-portal'));