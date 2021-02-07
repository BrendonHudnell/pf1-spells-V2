import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

export const env = {
	dbHost: process.env.DB_HOST ?? '',
	dbUser: process.env.DB_USER ?? '',
	dbPassword: process.env.DB_PASS ?? '',
	dbDatabase: process.env.DB_DBASE ?? '',
	dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
};

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/api', routes);

app.get('*', (req: Request, res: Response): void => {
	res.sendFile(
		path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
	);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
