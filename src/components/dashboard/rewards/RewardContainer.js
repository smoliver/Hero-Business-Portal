import React from 'react';

import RewardList from './RewardList';
import RewardForm from './RewardForm';
import auth from '../../../auth';

class RewardContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            rewards: []
        }
    } 

    toggleEditing(idx) {
        this.state.rewards[idx].editing = !this.state.rewards[idx].editing;
        this.setState({
            rewards: this.state.rewards
        });
    }

    updateReward(idx, reward) {
        if (idx < 0) {
            this.state.rewards.push(reward);
        } else {
            this.state.rewards.splice(idx, 1, reward);
        }
        this.setState({
            rewards: this.state.rewards
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
            console.log(details);
            this.setState({
                rewards: details.results
            });
        });
    }

    render() {
        return (
            <section className="rewards">
                <h3 className="rewards--header">
                    Rewards
                </h3>
                <RewardList rewards={this.state.rewards} onUpdate={this.updateReward.bind(this)} onToggle={this.toggleEditing.bind(this)} />
                <RewardForm onUpdate={this.updateReward.bind(this, -1)} />
            </section>
        );
    }
}

export default RewardContainer;