import React from 'react';
import Icon from '../../Icon';

const Reward = ({ reward_id, name, points, cost_of_goods, image_url }) => {
  let dollarCost;
  if (cost_of_goods) dollarCost = cost_of_goods / 100;
  return (
    <li className="rewards-item">
      <img src="{image_url}" className="rewards-item--icon"/>
      <div className="rewards-item--information">
        <h4 className="rewards-item--title">{name}</h4>
        <h5 className="rewards-item--points">  
          <Icon symbol={Icon.SYMBOLS.REWARD} className="rewards-item--points-icon"/>
          {points}
        </h5>
        <h5 className="rewards-item--price"> 
          <Icon symbol={Icon.SYMBOLS.DOLLAR} className="rewards-item--price-icon"/>
          {dollarCost}
        </h5>
      </div>
      <div className="rewards-item-actions">
        <Icon symbol={Icon.SYMBOLS.X} className="rewards-item-actions--action"/>
        <Icon symbol={Icon.SYMBOLS.PENCIL} className="rewards-item-actions--action"/>
      </div>
    </li>
  )
}

export default Reward;