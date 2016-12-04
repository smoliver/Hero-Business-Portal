import React from 'react';
import IconsUrl from '../images/icons.svg';


const Icon = ({className, symbol, onClick, viewBox='0 0 100 100'}) => (
	<svg viewBox={viewBox} className={className} onClick={onClick}>
		<use xlinkHref={`${IconsUrl}#${symbol}`}></use>
	</svg>
)

Icon.SYMBOLS = {
	'PENCIL': 'pencil',
	'LOGO': 'logo',
	'X': 'x',
	'REWARD': 'reward',
	'DOLLAR': 'dollar',
	'PLUS': 'plus',
	'CANCEL': 'cancel',
	'GRAPH': 'graph',
	'HELP': 'question-mark'
}

export default Icon;