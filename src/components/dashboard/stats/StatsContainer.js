import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';
import Icon from '../../Icon'
import auth from '../../../auth';

class StatsContainer extends React.Component {
    constructor() {
        super();

        this.updateAvgSpend = this.updateAvgSpend.bind(this);
        this.updatePartySize = this.updatePartySize.bind(this);
        this.updateBusiness = this.updateBusiness.bind(this);
        this.renderBenefits = this.renderBenefits.bind(this);
        this.renderRewardsRedeemed = this.renderRewardsRedeemed.bind(this);
        this.renderAvgSpend = this.renderAvgSpend.bind(this);
        this.state = {
            rewardsRedeemed: null,
            business: null
        }
    }

    updateBusiness(newBusiness){
        this.props.onUpdateBusiness(newBusiness);
    }


    updatePartySize(size){
        let newBusiness = this.props.business;
        newBusiness['avg_party_size'] = size;
        this.updateBusiness(newBusiness);
    }

    updateAvgSpend(spent){
        let newBusiness = this.props.business;
        newBusiness['avg_customer_spent'] = spent;
        this.updateBusiness(newBusiness);
    }

    renderAvgSpend() {
        if(this.props.business && this.props.business['avg_customer_spent']){
            return (
                <div className="stats-card">
                    <Stat name={'Average Customer Spend'} 
                        value={this.props.business['avg_customer_spent']} />
                </div>
            );
        }
        return;
    }

    renderRewardsRedeemed() {
        let rewardsRedeemed = this.state.rewardsRedeemed;
        if(!(rewardsRedeemed === null || rewardsRedeemed === undefined)){
            return (
                <div className="stats-card">
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

        if (rewardsRedeemed != undefined && customerSpend != undefined && partySize != partySize) {
            let trafficDriven = partySize * rewardsRedeemed;
            let estimatedProfit = trafficDriven * customerSpend;
            return (
                <div className="stats-card">
                    <Stat name={'Estimated Traffic Driven'} value={trafficDriven} />
                    <Icon className="stats-icon" symbol={Icon.SYMBOLS.REWARD} />
                    <Stat name={'Estimated Profits'} value={estimatedProfit} />
                </div>
            )
        }
        return;
    }

    render() {
        console.log("Stats container business");
        console.log(this.props.business);
        return (
            <div className="stats">
                {this.renderAvgSpend()}
                {this.renderRewardsRedeemed()}
                {this.renderBenefits()}
            </div>
        );
    }
}

export default StatsContainer;