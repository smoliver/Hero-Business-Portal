import React from 'react';

const DashboardSection = ({className, active, children}) =>{

	// If classname is undefined sets it to just dashboard-section
	className = className = `${className || ''}  dashboard-section`
	if (active) className += ' active';
	return (
		<div className={className}>
			{children}
		</div>
	)
}

export default DashboardSection;