import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';

const Dashboard = ({business, onUpdateBusiness}) => (
    <div className="dashboard">
        <RewardContainer business={business} />
        <StatsContainer business={business} onUpdateBusiness={onUpdateBusiness}/>
    </div>
)

export default Dashboard;