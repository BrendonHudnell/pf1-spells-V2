import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import { createApp } from '../../../src/app';
import {
	processRequest,
	QueryObject,
	spellService,
} from '../../../src/modules/spellSearch';

describe('spellRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and return all entries when request is empty', (done) => {
			sandbox.stub(spellService, 'getSpells').resolves([]);

			request(app)
				.get('/api/spellSearch')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.length).toEqual(0);
					done();
				});
		});

		it('should return 400 for parameters with illegal values', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						dataPath: '/query/fortitude',
						schemaPath: '#/properties/query/properties/fortitude/type',
						params: {
							type: 'boolean',
						},
						message: 'should be boolean',
					},
				],
			};

			request(app)
				.get('/api/spellSearch?fortitude=not-a-boolean')
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for illegal parameters', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'additionalProperties',
						dataPath: '/query',
						schemaPath: '#/properties/query/additionalProperties',
						params: {
							additionalProperty: 'illegal-parameter',
						},
						message: 'should NOT have additional properties',
					},
				],
			};

			request(app)
				.get('/api/spellSearch?illegal-parameter=true')
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});
	});
});

describe('processRequest', () => {
	it('should convert the searchString param', () => {
		const params = {
			searchString: '     searchString    ',
		};
		const expectedResult: QueryObject = {
			searchString: 'searchString',
			spellResistance: '',
			classes: [],
			saves: [],
			spellLevels: [],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});

	it('should convert the spellResistance param true to yes', () => {
		const params = {
			spellResistance: true,
		};
		const expectedResult: QueryObject = {
			searchString: '',
			spellResistance: 'yes',
			classes: [],
			saves: [],
			spellLevels: [],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});

	it('should convert the spellResistance param false to no', () => {
		const params = {
			spellResistance: false,
		};
		const expectedResult: QueryObject = {
			searchString: '',
			spellResistance: 'no',
			classes: [],
			saves: [],
			spellLevels: [],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});

	it('should convert the save params', () => {
		const params = {
			fortitude: true,
			reflex: true,
			will: false,
			none: true,
		};
		const expectedResult: QueryObject = {
			searchString: '',
			spellResistance: '',
			classes: [],
			saves: ['fortitude', 'reflex', 'none'],
			spellLevels: [],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});

	it('should convert the spellLevel params', () => {
		const params = {
			'0th': true,
			'1st': true,
			'2nd': true,
			'3rd': true,
			'4th': true,
			'5th': true,
			'6th': true,
			'7th': true,
			'8th': false,
			'9th': true,
		};
		const expectedResult: QueryObject = {
			searchString: '',
			spellResistance: '',
			classes: [],
			saves: [],
			spellLevels: [0, 1, 2, 3, 4, 5, 6, 7, 9],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});

	it('should convert the class params', () => {
		const params = {
			skald: true,
			investigator: true,
			alchemist: true,
			antipaladin: true,
			arcanist: true,
			bard: true,
			bloodrager: true,
			cleric: true,
			druid: true,
			hunter: true,
			inquisitor: true,
			magus: true,
			medium: true,
			mesmerist: true,
			occultist: true,
			oracle: true,
			paladin: true,
			psychic: true,
			ranger: true,
			shaman: true,
			sorcerer: true,
			spiritualist: true,
			summoner: false,
			summoner_unchained: true,
			witch: true,
			wizard: true,
		};
		const expectedResult: QueryObject = {
			searchString: '',
			spellResistance: '',
			classes: [
				'bard',
				'skald',
				'alchemist',
				'investigator',
				'antipaladin',
				'wiz',
				'bloodrager',
				'cleric',
				'druid',
				'hunter',
				'inquisitor',
				'magus',
				'spell_medium',
				'mesmerist',
				'occultist',
				'oracle',
				'paladin',
				'psychic',
				'ranger',
				'shaman',
				'sor',
				'spiritualist',
				'summoner_unchained',
				'witch',
			],
			saves: [],
			spellLevels: [],
		};

		const result = processRequest(params);

		expect(result).toMatchObject(expectedResult);
	});
});
