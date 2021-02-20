export interface Save {
	value: keyof Saves;
	display: string;
}

export const savesList: Save[] = [
	{ value: 'fortitude', display: 'Fortitude' },
	{ value: 'reflex', display: 'Reflex' },
	{ value: 'will', display: 'Will' },
	{ value: 'none', display: 'None' },
];

export interface Saves {
	fortitude: boolean;
	none: boolean;
	reflex: boolean;
	will: boolean;
}
