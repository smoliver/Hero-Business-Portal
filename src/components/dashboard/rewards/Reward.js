import React from 'react';
import Icon from '../../Icon';
import defaultThumbnail from '../../../images/default-thumbnail.png';

class Reward extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.toggleEditing) this.toggleEditing = this.props.toggleEditing;
    if (this.props.deactivateReward) this.deactivateReward = this.props.deactivateReward;
    this.displayClasses = this.displayClasses.bind(this);
  }

  toggleEditing() {
    console.log("Toggle Editing `toggleEditing` not provided as a prop");
  }

  deactivateReward() {
    console.log("Deactivate `deactivate` not provided in props");
  }

  displayClasses() {
    let classes = '';
    if (this.props.updating === true) classes += ' updating';
    if (this.props.interacting === true) classes += ' interacting';
    return classes;
  }

  render() {
    let dollarCost;
    if (this.props.cost_of_goods) dollarCost = this.props.cost_of_goods / 100;

    let thumbnail = null;
    if(this.props.business) thumbnail = this.props.business.thumbnail;
    if (!thumbnail) thumbnail = defaultThumbnail; 

    return (
      <li className={'rewards-item ' + this.displayClasses()} onClick={this.props.interactWithReward} >
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
          <Icon symbol={Icon.SYMBOLS.X} className="rewards-item-actions--action delete" onClick={this.deactivateReward} />
          <Icon symbol={Icon.SYMBOLS.PENCIL} className="rewards-item-actions--action" onClick={this.toggleEditing} />
        </div>
      </li>
    )
  }
}

export default Reward;