import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatList from './stats/StatList';

const Dashboard = () => (
    <div className="dashboard">
        <RewardContainer />
        <StatList />
    </div>
)

export default Dashboard;