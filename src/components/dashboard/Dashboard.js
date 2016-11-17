import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatList from './stats/StatList';

const Dashboard = () => (
    <div>
        <h2>Dashboard</h2>
        <RewardContainer />
        <StatList />
    </div>
)

export default Dashboard;