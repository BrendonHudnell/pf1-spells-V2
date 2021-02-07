import { Router, Request, Response } from 'express';
import spellsearch from './spellsearch';

const router = Router();

router.use('/spellsearch', spellsearch);

router.get('/', (req: Request, res: Response): void => {
	res.send('You have reached the API');
});

router.get('*', (req: Request, res: Response): void => {
	res.send('That endpoint does not exist :(');
});

export default router;
