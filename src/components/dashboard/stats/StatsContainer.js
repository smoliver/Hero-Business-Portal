import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';
import auth from '../../../auth';

class StatsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            customerAvgSpend: -1,
            rewardsRedeemed: -1,
            avgPartySize: -1
        }
    }

    componentDidMount() {
        let centsToDollars = cents => (cents / 100).toFixed(2),
            statTransform = {
                profit: centsToDollars,
                revenue: centsToDollars,
                avg_party_size: val => val
            };

        // Fetch stats
        fetch(`${process.env.API_DOMAIN}/business/metrics/${auth.getBusinessId()}/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.getToken()}`
            }
        }).then(response => response.json())
        .then(stats => {
            let statList = [];
            console.log(stats);
            for (let stat in stats) {
                let transform = statTransform[stat],
                    val = stats[stat];
                if (transform) {
                    statList.push({
                        name: stat,
                        value: transform(val)
                    });
                }
            }
            // this.setState({
            //     stats: statList
            // });
        });
    }

    render() {
        
        return (
            <div>
                
            </div>
        );
    }
}

export default StatsContainer;