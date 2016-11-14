import React from 'react';

import Stat from './Stat';
import StatForm from './StatForm';

class StatList extends React.Component {
    constructor() {
        super();
        this.state = {
            stats: []
        }
    }

    componentDidMount() {
        // Fetch stats
    }

    render() {
        let statComponents = this.state.stats.map((stat) => {
            if (stat.editing) {
                return <StatForm stat={stat} />;
            } else {
                return <Stat stat={stat} />;
            }
        });
        return (
            <div>
                {statComponents}
                <StatForm />
            </div>
        );
    }
}

export default StatList;