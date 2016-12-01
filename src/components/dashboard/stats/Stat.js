import React from 'react';

const Stat = ({ name, value }) => (
    <div className="stat">
    	<strong className="stat--value">{ value }</strong>
        <h6 className="stat--title">{ name }</h6>
    </div>
)

export default Stat;