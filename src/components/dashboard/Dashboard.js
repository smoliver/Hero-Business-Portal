import React from 'react';

import RewardList from './rewards/RewardList';
import StatList from './stats/StatList';

const Dashboard = () => (
    <div>
        <h2>Dashboard</h2>
        <RewardList />
        <StatList />
    </div>
)

export default Dashboard;