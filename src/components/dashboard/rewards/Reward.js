import React from 'react';
import Icon from '../../Icon';
import defaultThumbnail from '../../../images/default-thumbnail.png';

class Reward extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.toggleEditing) this.toggleEditing = this.props.toggleEditing;
    if (this.props.deactivate) this.deactivate = this.props.deactivate;
  }

  toggleEditing() {
    console.log("Toggle Editing `toggleEditing` not provided as a prop");
  }

  deactivate() {
    console.log("Deactivate `deactivate` not provided in props");
  }

  render() {
    let dollarCost;
    if (this.props.cost_of_goods) dollarCost = this.props.cost_of_goods / 100;

    let thumbnail = this.props.business.thumbnail;
    if (!thumbnail) thumbnail = defaultThumbnail; 

    return (
      <li className="rewards-item">
        <img src={thumbnail} className="rewards-item--icon"/>
        <div className="rewards-item--information">
          <h4 className="rewards-item--title">{this.props.name}</h4>
          <h5 className="rewards-item--points">  
            <Icon symbol={Icon.SYMBOLS.REWARD} className="rewards-item--points-icon"/>
            {this.props.points}
          </h5>
          <h5 className="rewards-item--price"> 
            <Icon symbol={Icon.SYMBOLS.DOLLAR} className="rewards-item--price-icon"/>
            {dollarCost}
          </h5>
        </div>
        <div className="rewards-item-actions">
          <Icon symbol={Icon.SYMBOLS.X} className="rewards-item-actions--action" />
          <Icon symbol={Icon.SYMBOLS.PENCIL} className="rewards-item-actions--action" onClick={this.toggleEditing} />
        </div>
      </li>
    )
  }
}

export default Reward;