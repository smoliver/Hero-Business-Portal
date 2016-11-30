import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';
import DashboardSection from './DashboardSection';
import DashboardLink from './DashboardLink';
import Icon from '../Icon';

export const REWARDS = '#rewards';
export const STATS = '#stats';

const Dashboard = ({business, onUpdateBusiness, location: {hash}}) => {
  // provide to DashboardSection's `active` prop if it should be the default
  let defaultTo = !hash || ![REWARDS, STATS].includes(hash);

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <DashboardLink to={{ pathname: 'dashboard', hash: REWARDS }} active={hash == REWARDS || defaultTo} > 
          <Icon symbol={Icon.SYMBOLS.REWARD} className="dashboard-nav--icon"/> 
          <h5 className="dashboard-nav--name">Rewards</h5>
        </DashboardLink>
        <DashboardLink to={{ pathname: 'dashboard', hash: STATS }} active={hash == STATS}>
          <Icon symbol={Icon.SYMBOLS.GRAPH} className="dashboard-nav--icon"/>
          <h5 className="dashboard-nav--name">Stats </h5>
        </DashboardLink>
      </div>
      <div className="dashboard--container">
        <DashboardSection active={hash == REWARDS || defaultTo}>
          <RewardContainer  business={business} />
        </DashboardSection>
        <DashboardSection active={hash == STATS}>
          <StatsContainer business={business} onUpdateBusiness={onUpdateBusiness}/>
        </DashboardSection>
      </div>
    </div>
  ) 
};

export default Dashboard;