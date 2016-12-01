import React from 'react';
import Profile from './Profile';

const ProfileContainer = (props) => {
  return props.business ? <Profile {...props} /> : null;
}

export default ProfileContainer;