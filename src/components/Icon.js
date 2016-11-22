import React from 'react';
import IconsUrl from '../images/icons.svg';


class Icon extends React.Component {
	
	render () {
		return (
			<svg viewBox='0 0 100 100' className={this.props.className} onClick={this.props.onClick}>
				<use xlinkHref={IconsUrl + '#' + this.props.symbol}></use>
			</svg>
		);
	}
}

Icon.SYMBOLS = {
	'PENCIL': 'pencil',
	'LOGO': 'logo',
	'X': 'x',
	'REWARD': 'reward',
	'DOLLAR': 'dollar',
	'PLUS': 'plus'
}

export default Icon;