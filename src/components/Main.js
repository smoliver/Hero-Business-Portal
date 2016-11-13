import React from 'react';

import Header from './Header';

const Main = ({ children }) => (
	<div>
		<Header title={'Bizness Portal'} />
		{ children }
	</div>
)

export default Main;