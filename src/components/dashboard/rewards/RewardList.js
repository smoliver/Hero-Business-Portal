import React from 'react';

import Reward from './Reward';
import RewardForm from './RewardForm';
import RewardDeleted from './RewardDeleted';
import auth from '../../../auth';

class RewardList extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleEditing(idx) {
        this.props.onToggle(idx);
    }

    updatingReward(idx, reward) {
        return this.props.onUpdating(idx, reward);
    }

    updatedReward(idx, reward) {
        return this.props.onUpdated(idx, reward);
    }

    deactivateReward(idx, reward) {
        return this.props.onDeactivate(idx, reward);
    }

    activateReward(idx, reward) {
        return this.props.onActivate(idx, reward);
    }

    interactWithReward(idx) {
        this.props.onInteract(idx);
    }

    render() {
        let rewardComponents = this.props.rewards.map((reward, idx) => {
            if(reward.active === true){
                if (reward.editing) {
                    return <RewardForm {...reward} key={reward.id || idx} 
                        onUpdating={this.updatingReward.bind(this, idx)} 
                        onUpdated={this.updatedReward.bind(this)}
                        cancel={this.toggleEditing.bind(this, idx)}
                        business={this.props.business} />;
                } else {
                    return <Reward {...reward} key={reward.id || idx} 
                        toggleEditing={this.toggleEditing.bind(this, idx)} 
                        deactivateReward={this.deactivateReward.bind(this, idx, reward)}
                        onUpdating={this.updatingReward.bind(this, idx)} onUpdated={this.updatedReward.bind(this)} 
                        interactWithReward={this.interactWithReward.bind(this, idx)} 
                        business={this.props.business} />;
                }
            } else if (reward.active === false && reward.undoDuration) {
                return <RewardDeleted key={reward.id || idx}
                    rewardName={reward.name}
                    undo={this.activateReward.bind(this, idx, reward)} />
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