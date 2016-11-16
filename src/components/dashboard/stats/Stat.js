import React from 'react';

const Stat = ({ name, value }) => (
    <div>
        <h3>{ name }</h3>
        <h2>{ value }</h2>
    </div>
)

export default Stat;