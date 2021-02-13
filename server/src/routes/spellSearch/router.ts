import { Router, Request, Response } from 'express';
import { createConnection } from 'mysql';
import { URL } from 'url';
import { env } from '../../server';
import { createSQLParameters } from './createSQLParameters';
import { processQuery } from './processQuery';

const spellSearchRouter = Router();

spellSearchRouter.get('/', (req: Request, res: Response): void => {
	const queryObject = processQuery(new URL(req.url, 'https://dummyurl.com'));

	// create the query string
	const baseSQL =
		'SELECT spell_name, description_formatted, short_description, spell_level, saving_throw, spell_resistance FROM spells';
	const SQLParams = createSQLParameters(queryObject);

	// create database connection
	const connection = createConnection({
		host: env.dbHost,
		user: env.dbUser,
		password: env.dbPassword,
		database: env.dbDatabase,
		port: env.dbPort,
	});

	// connect to database and perform query
	connection.connect((err) => {
		if (err) {
			console.log(err);
			throw err;
		}
		connection.query(baseSQL + SQLParams, (err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}

			res.json(result);
		});
	});
});

export { spellSearchRouter };
