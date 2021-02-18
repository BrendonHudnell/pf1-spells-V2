import { requestValidator } from '../../validator';

export const spellSearchValidator = requestValidator({
	query: {
		type: 'object',
		additionalProperties: false,
		properties: {
			searchString: {
				type: 'string',
			},
			spellResistance: {
				type: 'string',
				enum: ['true', 'false'],
			},
			alchemist: {
				type: 'string',
				enum: ['true', 'false'],
			},
			antipaladin: {
				type: 'string',
				enum: ['true', 'false'],
			},
			arcanist: {
				type: 'string',
				enum: ['true', 'false'],
			},
			bard: {
				type: 'string',
				enum: ['true', 'false'],
			},
			bloodrager: {
				type: 'string',
				enum: ['true', 'false'],
			},
			cleric: {
				type: 'string',
				enum: ['true', 'false'],
			},
			druid: {
				type: 'string',
				enum: ['true', 'false'],
			},
			hunter: {
				type: 'string',
				enum: ['true', 'false'],
			},
			inquisitor: {
				type: 'string',
				enum: ['true', 'false'],
			},
			investigator: {
				type: 'string',
				enum: ['true', 'false'],
			},
			magus: {
				type: 'string',
				enum: ['true', 'false'],
			},
			medium: {
				type: 'string',
				enum: ['true', 'false'],
			},
			mesmerist: {
				type: 'string',
				enum: ['true', 'false'],
			},
			occultist: {
				type: 'string',
				enum: ['true', 'false'],
			},
			oracle: {
				type: 'string',
				enum: ['true', 'false'],
			},
			paladin: {
				type: 'string',
				enum: ['true', 'false'],
			},
			psychic: {
				type: 'string',
				enum: ['true', 'false'],
			},
			ranger: {
				type: 'string',
				enum: ['true', 'false'],
			},
			shaman: {
				type: 'string',
				enum: ['true', 'false'],
			},
			skald: {
				type: 'string',
				enum: ['true', 'false'],
			},
			sorcerer: {
				type: 'string',
				enum: ['true', 'false'],
			},
			spiritualist: {
				type: 'string',
				enum: ['true', 'false'],
			},
			summoner: {
				type: 'string',
				enum: ['true', 'false'],
			},
			summoner_unchained: {
				type: 'string',
				enum: ['true', 'false'],
			},
			witch: {
				type: 'string',
				enum: ['true', 'false'],
			},
			wizard: {
				type: 'string',
				enum: ['true', 'false'],
			},
			fortitude: {
				type: 'string',
				enum: ['true', 'false'],
			},
			reflex: {
				type: 'string',
				enum: ['true', 'false'],
			},
			will: {
				type: 'string',
				enum: ['true', 'false'],
			},
			none: {
				type: 'string',
				enum: ['true', 'false'],
			},
			'0th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'1st': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'2nd': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'3rd': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'4th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'5th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'6th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'7th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'8th': {
				type: 'string',
				enum: ['true', 'false'],
			},
			'9th': {
				type: 'string',
				enum: ['true', 'false'],
			},
		},
	},
});
