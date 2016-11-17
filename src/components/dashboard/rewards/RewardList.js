import React from 'react';

import Reward from './Reward';
import RewardForm from './RewardForm';
import auth from '../../../auth';

class RewardList extends React.Component {

    toggleEditing(idx) {
        this.props.onToggle(idx);
    }

    updateReward(idx, reward) {
        this.props.onUpdate(idx, reward);
    }

    render() {
        let rewardComponents = this.props.rewards.map((reward, idx) => {
            let detailComponent;
            if (reward.editing) {
                detailComponent = <RewardForm {...reward} onUpdate={this.updateReward.bind(this, idx)} />;
            } else {
                detailComponent = <Reward {...reward} />;
            }
            return (
                <div key={reward.id}>
                    {detailComponent}
                    <button onClick={this.toggleEditing.bind(this, idx)}>
                        {reward.editing ? 'Cancel' : 'Edit'}
                    </button>
                </div>
            )
        });
        return (
            <div>
                {rewardComponents}
            </div>
        );
    }
}

export default RewardList;