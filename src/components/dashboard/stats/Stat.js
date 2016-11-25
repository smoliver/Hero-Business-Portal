import React from 'react';

const Stat = ({ name, value }) => (
    <div>
    	<strong>{ value }</strong>
        <h3>{ name }</h3>
    </div>
)

export default Stat;