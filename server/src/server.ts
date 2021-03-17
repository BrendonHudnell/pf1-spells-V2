import { connection } from './utils';
import { createApp } from './app';

connection
	.create()
	.then(async () => {
		const app = createApp();

		const port = process.env.PORT || 5000;
		app.listen(port, () => console.log(`Server listening on port ${port}`));
	})
	.catch((error) => console.log('TypeORM connection error: ', error));
