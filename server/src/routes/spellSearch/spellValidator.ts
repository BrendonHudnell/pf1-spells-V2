import { requestValidator } from '../../validator';

export const spellSearchValidator = requestValidator(
	{
		query: {
			type: 'object',
			additionalProperties: false,
			properties: {
				searchString: {
					type: 'string',
				},
				spellResistance: {
					type: 'boolean',
				},
				alchemist: {
					type: 'boolean',
				},
				antipaladin: {
					type: 'boolean',
				},
				arcanist: {
					type: 'boolean',
				},
				bard: {
					type: 'boolean',
				},
				bloodrager: {
					type: 'boolean',
				},
				cleric: {
					type: 'boolean',
				},
				druid: {
					type: 'boolean',
				},
				hunter: {
					type: 'boolean',
				},
				inquisitor: {
					type: 'boolean',
				},
				investigator: {
					type: 'boolean',
				},
				magus: {
					type: 'boolean',
				},
				medium: {
					type: 'boolean',
				},
				mesmerist: {
					type: 'boolean',
				},
				occultist: {
					type: 'boolean',
				},
				oracle: {
					type: 'boolean',
				},
				paladin: {
					type: 'boolean',
				},
				psychic: {
					type: 'boolean',
				},
				ranger: {
					type: 'boolean',
				},
				shaman: {
					type: 'boolean',
				},
				skald: {
					type: 'boolean',
				},
				sorcerer: {
					type: 'boolean',
				},
				spiritualist: {
					type: 'boolean',
				},
				summoner: {
					type: 'boolean',
				},
				summoner_unchained: {
					type: 'boolean',
				},
				witch: {
					type: 'boolean',
				},
				wizard: {
					type: 'boolean',
				},
				fortitude: {
					type: 'boolean',
				},
				reflex: {
					type: 'boolean',
				},
				will: {
					type: 'boolean',
				},
				none: {
					type: 'boolean',
				},
				'0th': {
					type: 'boolean',
				},
				'1st': {
					type: 'boolean',
				},
				'2nd': {
					type: 'boolean',
				},
				'3rd': {
					type: 'boolean',
				},
				'4th': {
					type: 'boolean',
				},
				'5th': {
					type: 'boolean',
				},
				'6th': {
					type: 'boolean',
				},
				'7th': {
					type: 'boolean',
				},
				'8th': {
					type: 'boolean',
				},
				'9th': {
					type: 'boolean',
				},
			},
		},
	},
	true
);
