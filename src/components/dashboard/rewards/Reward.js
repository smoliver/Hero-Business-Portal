import React from 'react';

const Reward = ({ name, points, cost_of_goods, image_url }) => {
  let dollarCost;
  if (cost_of_goods) dollarCost = cost_of_goods / 100;
  return (
    <li>
      <img src="{image_url}" className="rewards-item--icon"/>
      <div className="rewards-item--information">
        <h4 className="rewards-item--title">{name}</h4>
        <h5 className="rewards-item--points">  
          <svg viewBox="0 0 100 100" className="rewards-item--points-icon">
            <use xlinkHref="../icons.svg#reward"></use>
          </svg>
          {points}
        </h5>
        <h5 className="rewards-item--price"> 
          <svg viewBox="0 0 100 100" className="rewards-item--price-icon">
            <use xlinkHref="../icons.svg#dollar"></use>
          </svg> 
          {dollarCost}
        </h5>
      </div>
      <div className="rewards-item-actions">
        <svg viewBox="0 0 100 100" 
          className="rewards-item-actions--action">
          <use xlinkHref="../icons.svg#x"></use>
        </svg>
        <svg viewBox="0 0 100 100" 
          className="rewards-item-actions--action">
          <use xlinkHref="../icons.svg#pencil"></use>
        </svg>
      </div>
    </li>
  )
}

export default Reward;