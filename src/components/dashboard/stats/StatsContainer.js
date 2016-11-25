import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';
import auth from '../../../auth';

class StatsContainer extends React.Component {
    constructor() {
        super();

        this.updateAvgSpend = this.updateAvgSpend.bind(this);
        this.state = {
            avgSpend: null,
            rewardsRedeemed: null,
            avgPartySize: null
        }
    }

    updatePartySize(size){
        let that = this;
        fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth.getToken()}`
            },
            body: {
                'avg_party_size': size
            }
        }).then(response => response.json())
        .then(function(business) {
            that.setState({
                avgPartySize: business['avg_party_size']
            })
        });
    }

    updateAvgSpend(spent){
        let that = this;
        fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth.getToken()}`
            },
            body: {
                'avg_customer_spent': spent
            }
        }).then(response => response.json())
        .then(function(business) {
            that.setState({
                avgSpend: business['avg_customer_spent']
            })
        });
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
            console.log('Transactions');
            console.log(stats);
            that.setState({
                rewardsRedeemed: stats['count']
            })
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                
            </div>
        );
    }
}

export default StatsContainer;