import React from 'react';
import { Link } from 'react-router';

const DashboardLink = ({to, active, className, children}) => {
  className = 'dashboard-nav--link ' + (className || '');
  if (active) className += ' active';

  return (
    <Link to={to} className={className} > 
      {children}
    </Link>
  )
}

export default DashboardLink;