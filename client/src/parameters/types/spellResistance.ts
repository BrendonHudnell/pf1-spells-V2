export interface SpellResistance {
	value: keyof SpellResistances;
	display: string;
}

export const spellResistanceList = [
	{ value: 'true', display: 'Yes' },
	{ value: 'false', display: 'No' },
	{ value: 'either', display: 'Either' },
];

export type SpellResistances = 'true' | 'false' | 'either';
