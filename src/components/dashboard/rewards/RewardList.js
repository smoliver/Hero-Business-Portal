import React from 'react';

import Reward from './Reward';
import RewardForm from './RewardForm';
import auth from '../../../auth';

class RewardList extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleEditing(idx) {
        this.props.onToggle(idx);
    }

    updatingReward(idx, reward) {
        this.props.onUpdating(idx, reward);
    }

    updatedReward(idx) {
        this.props.onUpdated(idx);
    }

    deactivateReward(idx, reward) {
        this.props.onDeactivate(idx, reward);
    }

    interactWithReward(idx) {
        this.props.onInteract(idx);
    }

    render() {
        console.log('render');
        console.log(this.props.rewards);
        let rewardComponents = this.props.rewards.map((reward, idx) => {
            if(reward.active === true){
                if (reward.editing) {
                    return <RewardForm {...reward} key={reward.id} onUpdating={this.updatingReward.bind(this, idx)} onUpdated={this.updatedReward.bind(this, idx)} />;
                } else {
                    return <Reward {...reward} key={reward.id} toggleEditing={this.toggleEditing.bind(this, idx)} deactivateReward={this.deactivateReward.bind(this, idx, reward)} onUpdating={this.updatingReward.bind(this, idx)} onUpdated={this.updatedReward.bind(this)} interactWithReward={this.interactWithReward.bind(this, idx)} />;
                }
            }
        });
        return (
            <ul className="rewards-list">
                {rewardComponents}
            </ul>
        );
    }
}

export default RewardList;