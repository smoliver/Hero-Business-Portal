import React from 'react';

const Stat = ({ name, value }) => (
    <div className="stat">
    	<strong className="stat--number">{ value }</strong>
        <h6 className="stat--title">{ name }</h6>
    </div>
)

export default Stat;