import dotenv from 'dotenv';

dotenv.config();

/* istanbul ignore next */
export const env = {
	dbHost: process.env.DB_HOST ?? '',
	dbUser: process.env.DB_USER ?? '',
	dbPassword: process.env.DB_PASS ?? '',
	dbDatabase: process.env.DB_DBASE ?? '',
	dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
};
