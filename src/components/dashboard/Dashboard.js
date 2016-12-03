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

  return business ? (
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
          <RewardContainer key={`${business.id}-rewards`} business={business} />
        </DashboardSection>
        <DashboardSection active={hash == STATS}>
          <StatsContainer key={`${business.id}-stats`} business={business} onUpdateBusiness={onUpdateBusiness}/>
        </DashboardSection>
      </div>
    </div>
  ) : null;
};

export default Dashboard;