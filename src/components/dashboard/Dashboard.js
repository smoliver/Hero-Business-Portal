import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';

const Dashboard = () => (
    <div className="dashboard">
        <RewardContainer />
        <StatsContainer />
    </div>
)

export default Dashboard;