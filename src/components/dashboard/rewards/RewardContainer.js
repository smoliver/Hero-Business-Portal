import React from 'react';

import Icon from '../../Icon';
import RewardList from './RewardList';
import RewardForm from './RewardForm';
import auth from '../../../auth';

import costOfGoodsHelp from  '../../../images/cost-of-goods-help.png';
import pointsHelp from '../../../images/points-help.png';

const ZENDESK_ARTICLE = "https://heroapp.zendesk.com/hc/en-us/sections/207248267-FAQ-for-Businesses-";

class RewardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      rewards: [],
      refresh: 0
    }
  } 

  // Toggle the Editing state of reward with index `idx`
  // Renders rewards with editing set to true as forms
  toggleEditing(idx) {
    this.state.rewards[idx].editing = !this.state.rewards[idx].editing;
    this.setState({
      rewards: this.state.rewards
    });
  }

  interactWithReward(curIdx) {
    let updatedRewards = this.state.rewards.map((reward, idx) => {
      reward.interacting = (curIdx == idx && reward.interacting == false);
      return reward;
    });
    this.setState({
      rewards: updatedRewards
    })
  }

  updatingReward(idx, reward) {
    let finalIndex = idx;
    reward.updating = true;

    if (idx < 0) {
      this.state.rewards.push(reward);
      finalIndex = this.state.rewards.length - 1;
      this.state.refresh = !this.state.refresh;
    } else {
      this.state.rewards.splice(idx, 1, reward);
    }
    this.setState({
      rewards: this.state.rewards,
      refresh: this.state.refresh
    });

    return finalIndex;
  }

  updatedReward(idx, reward) { 
    this.state.rewards[idx] = reward;
    this.state.rewards[idx].active = true;
    this.state.rewards[idx].updating = false;
    this.setState({
      rewards: this.state.rewards
    })
  }

  help() {
    let content = (
      <div>
        <h4>Rewards</h4>
        <p>Create, Edit, and delete rewards.  Give them descriptive names (eg. 1 free appetizer).</p>
        <img src={pointsHelp} />
        <p>Points represents the in-app cost for a user to redeem the reward (taking a cab home gives users 150pts and being the designated driver gives them 1000pts)</p>
        <img src={costOfGoodsHelp} />
        <p>Cost of goods should be how much it costs you to buy those products.</p>
        <p><a href={ZENDESK_ARTICLE}>Check out our FAQ for some more hints about rewards</a></p>

      </div>
    );
    this.props.showHelp(content);
  }

  // Sets active state locally and on the server to false
  deactivateReward(idx, reward) {
    this.state.rewards[idx].updating = true;
    this.setState({
      rewards: this.state.rewards
    });
    let inactive = {'active': false};
    let that = this;

    fetch(`${process.env.API_DOMAIN}/rewards/${reward.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth.getToken()}`
      },
      body: inactive
    }).then(response => response.json())
    .then(function(reward) {
      that.state.rewards[idx].active = false;
      that.setState({
        rewards: that.state.rewards
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentDidMount() {
    // Fetch rewards
    fetch(`${process.env.API_DOMAIN}/rewards/business/${this.props.business.id}/`,{
      headers: {
        'Authorization': `Token ${auth.getToken()}`
      },
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(details => {
      let results = details.results.map((reward) => {
        reward.updating = false;
        reward.interacting = false;
        reward.active = true;
        return reward;
      });
      this.setState({
        rewards: results
      });
    });
  }

  render() {
    return (
      <section className="rewards">
        <h3 className="rewards-header">
          <Icon symbol={Icon.SYMBOLS.REWARD} className="rewards-header--icon"/>
          Rewards
        </h3>
        <RewardList 
          rewards={this.state.rewards} 
          business={this.props.business}
          onUpdating={this.updatingReward.bind(this)}
          onUpdated={this.updatedReward.bind(this)} 
          onToggle={this.toggleEditing.bind(this)}
          onDeactivate={this.deactivateReward.bind(this)}
          onInteract={this.interactWithReward.bind(this)} />
        <RewardForm 
          key={this.state.refresh}
          business={this.props.business}
          className="main" 
          onUpdating={this.updatingReward.bind(this, -1)}
          onUpdated={this.updatedReward.bind(this)}
          help={this.help.bind(this)} />
      </section>
    );
  }
}

export default RewardContainer;