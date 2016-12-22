import React from 'react';
import Icon from '../../Icon';

const RewardDeleted = ({ undo, rewardName='' }) => (
  <div className='reward-deleted' onClick={undo}>
    <h5 className='reward-deleted--name'>Deleted {rewardName}</h5>
    <h4 className='reward-deleted--undo'>
      Undo?
      <Icon className='reward-deleted--icon' symbol={Icon.SYMBOLS.UNDO} />
    </h4>
  </div>
)

export default RewardDeleted;