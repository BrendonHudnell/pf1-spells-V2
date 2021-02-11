export interface SpellLevel {
	value: keyof SpellLevels;
	display: string;
}

export const spellLevelList: SpellLevel[] = [
	{ value: '0th', display: '0th' },
	{ value: '1st', display: '1st' },
	{ value: '2nd', display: '2nd' },
	{ value: '3rd', display: '3rd' },
	{ value: '4th', display: '4th' },
	{ value: '5th', display: '5th' },
	{ value: '6th', display: '6th' },
	{ value: '7th', display: '7th' },
	{ value: '8th', display: '8th' },
	{ value: '9th', display: '9th' },
];

export interface SpellLevels {
	'0th': boolean;
	'1st': boolean;
	'2nd': boolean;
	'3rd': boolean;
	'4th': boolean;
	'5th': boolean;
	'6th': boolean;
	'7th': boolean;
	'8th': boolean;
	'9th': boolean;
}
