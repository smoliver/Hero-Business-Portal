import React from 'react';

const DashboardSection = ({className, active, children}) =>{

	if (className) className += ' dashboard-section';
	else className = 'dashboard-section';
	if (active) className += ' active';
	return (
		<div className={className}>
			{children}
		</div>
	)
}

export default DashboardSection;