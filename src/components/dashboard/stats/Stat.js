import React from 'react';

const Stat = ({ name, value, symbol }) => (
    <div className="stat">
    	<strong className="stat--value"> {symbol || ''}{value}</strong>
        <h6 className="stat--title">{ name }</h6>
    </div>
)

export default Stat;