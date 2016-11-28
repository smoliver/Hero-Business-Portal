import React from 'react';

import RewardContainer from './rewards/RewardContainer';
import StatsContainer from './stats/StatsContainer';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <RewardContainer business={this.props.business} />
        <StatsContainer business={this.props.business} onUpdateBusiness={this.props.onUpdateBusiness}/>
      </div>
    );
  }
}

export default Dashboard;