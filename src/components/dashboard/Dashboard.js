import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';
import Icon from '../Icon';

const Dashboard = () => (
    <div className="dashboard">
    	<Icon symbol={Icon.SYMBOLS.PENCIL}/>
        <RewardContainer />
        <StatsContainer />
    </div>
)

export default Dashboard;