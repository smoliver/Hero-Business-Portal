import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';
import auth from '../../../auth';

class StatList extends React.Component {
    constructor() {
        super();
        this.state = {
            stats: []
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
        fetch(`${process.env.API_DOMAIN}/business/stats/${auth.getBusinessId()}/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.getToken()}`
            }
        }).then(response => response.json())
        .then(stats => {
            let statList = [];
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
            this.setState({
                stats: statList
            });
        });
    }

    render() {
        let statComponents = this.state.stats.map((stat) => {
            if (stat.editing) {
                return <StatForm key={stat.name} {...stat} />;
            } else {
                return <Stat key={stat.name} {...stat} />;
            }
        });
        return (
            <div>
                {statComponents}
            </div>
        );
    }
}

export default StatList;