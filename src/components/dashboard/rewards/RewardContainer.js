import React from 'react';

import RewardList from './RewardList';
import RewardForm from './RewardForm';
import auth from '../../../auth';

class RewardContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            rewards: [],
        }
    } 

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
        console.log(reward);

        let finalIndex = idx;
        reward.updating = true;

        if (idx < 0) {
            this.state.rewards.push(reward);
            finalIndex = this.state.rewards.length - 1;
        } else {
            this.state.rewards.splice(idx, 1, reward);
        }
        this.setState({
            rewards: this.state.rewards
        });

        return finalIndex;
    }

    updatedReward(idx) {
        this.state.rewards[idx].updating = false;
        this.setState({
            rewards: this.state.rewards
        })
    }

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
        fetch(`${process.env.API_DOMAIN}/rewards/business/${auth.getBusinessId()}/`,{
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
                <h3 className="rewards--header">
                    Rewards
                </h3>
                <RewardList 
                    rewards={this.state.rewards} 
                    onUpdating={this.updatingReward.bind(this)}
                    onUpdated={this.updatedReward.bind(this)} 
                    onToggle={this.toggleEditing.bind(this)}
                    onDeactivate={this.deactivateReward.bind(this)}
                    onInteract={this.interactWithReward.bind(this)} />
                <RewardForm 
                    className="main" 
                    onUpdating={this.updatingReward.bind(this, -1)}
                    onUpdated={this.updatedReward.bind(this)} />
            </section>
        );
    }
}

export default RewardContainer;