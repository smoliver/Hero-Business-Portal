import React from 'react';
import IconsUrl from '../images/icons.svg';


const Icon = ({className, symbol, onClick, viewBox='0 0 100 100'}) => (
	<svg viewBox={viewBox} className={className} onClick={onClick}>
		<use xlinkHref={`${IconsUrl}#${symbol}`}></use>
	</svg>
)

Icon.SYMBOLS = {
	'CANCEL': 'cancel',
	'CHECK': 'check',
	'DOLLAR': 'dollar',
	'GRAPH': 'graph',
	'HELP': 'question-mark',
	'LOGO': 'logo',
	'MENU': 'menu',
	'PENCIL': 'pencil',
	'PLUS': 'plus',
	'REWARD': 'reward',
	'UNDO': 'undo',
	'X': 'x'
}

export default Icon;