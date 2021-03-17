import request from 'supertest';
import { Express } from 'express';
import { connection } from '../../../src/utils';
import { createApp } from '../../../src/app';

let app: Express;

beforeAll(async () => {
	await connection.create();
	app = createApp();
});

afterAll(async () => {
	await connection.close();
});

describe('spellRouter', () => {
	describe('GET /', () => {
		it('should return 200 and return all entries when request is empty', (done) => {
			request(app)
				.get('/api/spellSearch')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.length).toEqual(2905);
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
