import React from 'react';

import Reward from './Reward';
import RewardForm from './RewardForm';

class RewardList extends React.Component {
    constructor() {
        super();
        this.state = {
            rewards: []
        }
    }

    componentDidMount() {
        // Fetch rewards
    }

    render() {
        let rewardComponents = this.state.rewards.map((reward) => {
            if (reward.editing) {
                return <RewardForm reward={reward} />;
            } else {
                return <Reward reward={reward} />;
            }
        });
        return (
            <div>
                {rewardComponents}
                <RewardForm />
            </div>
        );
    }
}

export default RewardList;