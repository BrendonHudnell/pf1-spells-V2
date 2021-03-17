import { createConnection, getConnection } from 'typeorm';
import { SpellEntity } from '../routes/spellSearch';
import { env } from '../server';

export const connection = {
	async create() {
		await createConnection({
			type: 'mysql',
			host: env.dbHost,
			username: env.dbUser,
			password: env.dbPassword,
			database: env.dbDatabase,
			port: env.dbPort,
			synchronize: false,
			entities: [SpellEntity],
		});
	},

	async close() {
		await getConnection().close();
	},
};
