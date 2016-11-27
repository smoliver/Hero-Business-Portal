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


    // Optomistically set's the react business state to the new state
    // Makes a server call to update the business online
    // If the call returns true, confirms the business state
    // If the call errors, reverts to the previous business state
    updateBusiness(newBusiness){
        let oldBusinessState = this.state.business;
        
        this.setState({
            business: newBusiness
        })

        let that = this;
        fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth.getToken()}`
            },
            body: newBusiness
        }).then(response => {
            response.json();
            console.log(response);
        })
        .then(function(business) {
            console.log("New Business");
            console.log(newBusiness);
            that.setState({
                'business': business
            });
        }).catch(function (err){
            console.log(err);
            that.setState({
                business: oldBusinessState
            })
        });
    }

    updatePartySize(size){
        let newBusiness = this.state.business;
        newBusiness['avg_party_size'] = size;
        this.updateBusiness(newBusiness);
    }

    updateAvgSpend(spent){
        let newBusiness = this.state.business;
        newBusiness['avg_customer_spent'] = spent;
        this.updateBusiness(newBusiness);
    }

    initializeBusiness(business){
        // If the average customer spent is not defined
        // Sets it to a default value of $20.00
        // updates the value on the server
        if (business['avg_customer_spent'] == undefined){
            business['avg_customer_spent'] = 2000
        } 

        // If the average party size is not defined
        // Sets it to a default value of 1
        // Updates the value on the server
        if (business['avg_party_size'] == undefined) {
            business['avg_party_size'] = 1;
        }

        return business;
    }

    componentDidMount() {
        let centsToDollars = cents => (cents / 100).toFixed(2),
            statTransform = {
                profit: centsToDollars,
                revenue: centsToDollars,
                avg_party_size: val => val
            };

        // Fetch stats
        let that = this;

        fetch(`${process.env.API_DOMAIN}/business/transactions/${auth.getBusinessId()}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.getToken()}`
            }
        }).then(response => response.json())
        .then(stats => {
            that.setState({
                rewardsRedeemed: stats['count']
            })
        });

        fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.getToken()}`
            }
        }).then(response => response.json())
        .then(business => {
            console.log("Fetched Business");
            console.log(business);
            if(business['avg_customer_spent'] == undefined ||
                business['avg_party_size'] == undefined){
                console.log("info missing");
                business = this.initializeBusiness(business);
                this.updateBusiness(business);
            }
            else {
                this.setState({
                    'business': business
                })
            }
        }).catch(function(err){
            console.log(err);
        })
    }



    renderAvgSpend() {
        if(this.state.business && this.state.business['avg_customer_spent']){
            return (
                <div className="stats-card">
                    <Stat name={'Average Customer Spend'} 
                        value={this.state.business['avg_customer_spent']} />
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
        let customerSpend = this.state.business ? this.state.business['avg_customer_spent'] : undefined;
        let partySize = this.state.business ? this.state.business['avg_party_size'] : undefined;

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