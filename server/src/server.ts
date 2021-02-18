import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './routes';
import { SpellEntity } from './routes/spellSearch';

dotenv.config();

export const env = {
	dbHost: process.env.DB_HOST ?? '',
	dbUser: process.env.DB_USER ?? '',
	dbPassword: process.env.DB_PASS ?? '',
	dbDatabase: process.env.DB_DBASE ?? '',
	dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
};

createConnection({
	type: 'mysql',
	host: env.dbHost,
	username: env.dbUser,
	password: env.dbPassword,
	database: env.dbDatabase,
	port: env.dbPort,
	synchronize: false,
	entities: [SpellEntity],
})
	.then(async (connection) => {
		const app = express();

		app.use(cors());

		app.use(
			express.static(path.join(__dirname, '..', '..', 'client', 'build'))
		);

		app.use('/api', routes);

		app.get('*', (req: Request, res: Response): void => {
			res.sendFile(
				path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
			);
		});

		const port = process.env.PORT || 5000;
		app.listen(port, () => console.log(`Server listening on port ${port}`));
	})
	.catch((error) => console.log('TypeORM connection error: ', error));
