import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';
import DashboardSection from './DashboardSection';
import DashboardLink from './DashboardLink';
import Help from './Help'
import Icon from '../Icon';

export const REWARDS = '#rewards';
export const STATS = '#stats';

class Dashboard extends React.Component { 
  
  constructor() {
    super();

    this.state = {
      help: false,
      helpContent: null
    }

    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  hideHelp() {
    this.setState({
      help: false,
      helpContent: null
    });
  }

  clickTarget(fn, event) {
    if(event.currentTarget == event.target){
      fn();
    }
  }

  showHelp(content) {
    this.setState({
      help: true,
      helpContent: content
    });
  }

  render() {
    // provide to DashboardSection's `active` prop if it should be the default
    let hash = this.props.location.hash;
    hash = hash && [REWARDS, STATS].includes(hash) ? hash : REWARDS;

    return this.props.business ? (
      <div className="dashboard">
        <Help display={this.state.help} 
          content={this.state.helpContent} 
          exit={this.hideHelp.bind(this)} />
        <div className="dashboard-nav">
          <DashboardLink to={{ pathname: 'dashboard', hash: REWARDS }} active={hash == REWARDS} > 
            <Icon symbol={Icon.SYMBOLS.REWARD} className="dashboard-nav--icon"/> 
            <h5 className="dashboard-nav--name">Rewards</h5>
          </DashboardLink>
          <DashboardLink to={{ pathname: 'dashboard', hash: STATS }} active={hash == STATS}>
            <Icon symbol={Icon.SYMBOLS.GRAPH} className="dashboard-nav--icon"/>
            <h5 className="dashboard-nav--name">Stats </h5>
          </DashboardLink>
        </div>
        <div className="dashboard--container">
          <DashboardSection active={hash == REWARDS}>
            <RewardContainer business={this.props.business} 
              showHelp={this.showHelp} />
          </DashboardSection>
          <DashboardSection active={hash == STATS} className="grow">
            <StatsContainer business={this.props.business} 
              onUpdateBusiness={this.props.onUpdateBusiness}
              showHelp={this.showHelp}/>
          </DashboardSection>
        </div>
      </div>
    ) : null;
  };
} 

export default Dashboard;