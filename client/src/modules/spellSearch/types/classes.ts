export interface Class {
	value: keyof Classes;
	display: string;
}

export const classList: Class[] = [
	{ value: 'alchemist', display: 'Alchemist' },
	{ value: 'antipaladin', display: 'Antipaladin' },
	{ value: 'arcanist', display: 'Arcanist' },
	{ value: 'bard', display: 'Bard' },
	{ value: 'bloodrager', display: 'Bloodrager' },
	{ value: 'cleric', display: 'Cleric' },
	{ value: 'druid', display: 'Druid' },
	{ value: 'hunter', display: 'Hunter' },
	{ value: 'inquisitor', display: 'Inquisitor' },
	{ value: 'investigator', display: 'Investigator' },
	{ value: 'magus', display: 'Magus' },
	{ value: 'medium', display: 'Medium' },
	{ value: 'mesmerist', display: 'Mesmerist' },
	{ value: 'occultist', display: 'Occultist' },
	{ value: 'oracle', display: 'Oracle' },
	{ value: 'paladin', display: 'Paladin' },
	{ value: 'psychic', display: 'Psychic' },
	{ value: 'ranger', display: 'Ranger' },
	{ value: 'shaman', display: 'Shaman' },
	{ value: 'skald', display: 'Skald' },
	{ value: 'sorcerer', display: 'Sorcerer' },
	{ value: 'spiritualist', display: 'Spiritualist' },
	{ value: 'summoner', display: 'Summoner' },
	{ value: 'witch', display: 'Witch' },
	{ value: 'wizard', display: 'Wizard' },
	{ value: 'summoner_unchained', display: 'Summoner (Unchained)' },
];

export interface Classes {
	alchemist: boolean;
	antipaladin: boolean;
	arcanist: boolean;
	bard: boolean;
	bloodrager: boolean;
	cleric: boolean;
	druid: boolean;
	hunter: boolean;
	inquisitor: boolean;
	investigator: boolean;
	magus: boolean;
	medium: boolean;
	mesmerist: boolean;
	occultist: boolean;
	oracle: boolean;
	paladin: boolean;
	psychic: boolean;
	ranger: boolean;
	shaman: boolean;
	skald: boolean;
	sorcerer: boolean;
	spiritualist: boolean;
	summoner: boolean;
	summoner_unchained: boolean;
	witch: boolean;
	wizard: boolean;
}
