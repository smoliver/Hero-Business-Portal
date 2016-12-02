import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';
import Icon from '../../Icon'
import auth from '../../../auth';

class StatsContainer extends React.Component {
    constructor() {
        super();

        this.updateAvgSpend = this.updateAvgSpend.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.fetchRewardsRedeemed = this.fetchRewardsRedeemed.bind(this);
        this.renderBenefits = this.renderBenefits.bind(this);
        this.renderRewardsRedeemed = this.renderRewardsRedeemed.bind(this);
        this.renderAvgSpend = this.renderAvgSpend.bind(this);
        this.state = {
            rewardsRedeemed: null,
            editing: false
        }
    }

    updateAvgSpend(spend){
        if (spend){
            let newBusiness = {};
            newBusiness['id'] = this.props.business.id;
            newBusiness['avg_customer_spent'] = spend;
            this.props.onUpdateBusiness(newBusiness);
        }
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing
        })
    }

    fetchRewardsRedeemed() {
        if (this.props.business) {
            fetch(`${process.env.API_DOMAIN}/business/transactions/${this.props.business.id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${auth.getToken()}`
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error ("Rewards Redeemed endpoint returned an error")
            }).then(results => {
                this.setState({
                    rewardsRedeemed: results.count
                });
            }).catch(function(err){
                console.log(err);
            })
        }

        else {

        }
    }

    onValueChange(attr, event) {
        this.setState({
            [attr]: event.target.value
        }); 
    }

    renderAvgSpend(editing) {
        if(this.props.business && this.props.business['avg_customer_spent']){
            let Display = editing ? StatForm : Stat ;
            let actions;
            if (editing) {
                actions = (
                    <div className="stats-card--actions">
                        <Icon symbol={Icon.SYMBOLS.PLUS} 
                            key={1}
                            onClick={() => { 
                                this.updateAvgSpend(this.state['avg_customer_spent']); 
                                this.toggleEditing(); 
                            }} 
                            className="stats-card--action"  />
                        <Icon symbol={Icon.SYMBOLS.CANCEL} 
                            key={2}
                            onClick={this.toggleEditing} 
                            className="stats-card--action cancel"/>
                    </div>
                )
            }
            else {
                actions =(
                    <div className="stats-card--actions">
                        <Icon symbol={Icon.SYMBOLS.PENCIL} 
                        key={3}
                        onClick={this.toggleEditing} 
                        className="stats-card--action" />
                    </div>
                )
            }
            return (
                <div className="stats-card" key={1}>
                    <Display name={'Average Customer Spend'} 
                        value={this.props.business['avg_customer_spent']} 
                        onValueChange={this.onValueChange.bind(this, 'avg_customer_spent')}
                        onSubmit={() => { updateAvgSpend(this.state['avg_customer_spent']) }} />
                        {actions}
                </div>
            );
        }
        return;
    }

    renderRewardsRedeemed() {
        let rewardsRedeemed = this.state.rewardsRedeemed;
        if(!(rewardsRedeemed == null)){
            return (
                <div className="stats-card" key={2}>
                    <Stat name={'Rewards Redeemed'}
                        value={this.state.rewardsRedeemed} />
                </div>
            )
        }
        return;
    }

    renderBenefits() {
        let rewardsRedeemed = this.state.rewardsRedeemed;
        let customerSpend = this.props.business ? this.props.business['avg_customer_spent'] : undefined;
        let partySize = this.props.business ? this.props.business['avg_party_size'] : undefined;

        if (rewardsRedeemed != undefined && customerSpend != undefined && partySize != undefined) {
            let trafficDriven = partySize * rewardsRedeemed;
            let estimatedProfit = trafficDriven * customerSpend;
            return (
                <div className="stats-card" key={3}>
                    <Stat name={'Estimated Traffic Driven'} value={trafficDriven} />
                    <Icon className="stats-icon" symbol={Icon.SYMBOLS.REWARD} />
                    <Stat name={'Estimated Profits'} value={estimatedProfit} />
                </div>
            )
        }
        return;
    }

    componentDidMount() {
        this.fetchRewardsRedeemed();
    }

    render() {
        return (
            <div className="stats">
                <h3 className="stats-header">
                    <Icon symbol={Icon.SYMBOLS.GRAPH} className="stats-header--icon"/>
                    Statistics
                </h3>
                <div className="stats--container">
                    {this.renderAvgSpend(this.state.editing)}
                    {this.renderRewardsRedeemed()}
                    {this.renderBenefits()}
                </div>
            </div>
        );
    }
}

export default StatsContainer;