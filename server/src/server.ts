import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { connection } from './utils';
import { createApp } from './app';

dotenv.config();

export const env = {
	dbHost: process.env.DB_HOST ?? '',
	dbUser: process.env.DB_USER ?? '',
	dbPassword: process.env.DB_PASS ?? '',
	dbDatabase: process.env.DB_DBASE ?? '',
	dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
};

connection
	.create()
	.then(async (connection) => {
		const app = createApp();

		const port = process.env.PORT || 5000;
		app.listen(port, () => console.log(`Server listening on port ${port}`));
	})
	.catch((error) => console.log('TypeORM connection error: ', error));
