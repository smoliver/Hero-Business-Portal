import React from 'react';

const Stat = ({ name, value }) => (
    <div>
    	<h2>{ value }</h2>
        <h3>{ name }</h3>
    </div>
)

export default Stat;