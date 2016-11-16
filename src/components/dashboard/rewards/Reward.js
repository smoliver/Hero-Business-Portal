import React from 'react';

const Reward = ({ name, points, cost_of_goods }) => {
    let dollarCost;
    if (cost_of_goods) dollarCost = cost_of_goods / 100;
    return (
        <div>
            <h3>{name}</h3>
            <p>
                Points: {points}; Cost: ${dollarCost}
            </p>
        </div>
    )
}

export default Reward;