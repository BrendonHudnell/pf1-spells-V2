import { Router, Request, Response } from 'express';
import { createSpellSearchRouter } from './spellSearch';

const router = Router();

router.use('/spellsearch', createSpellSearchRouter());

router.get('/', (req: Request, res: Response): void => {
	res.send('You have reached the API');
});

router.get('*', (req: Request, res: Response): void => {
	res.send('That endpoint does not exist :(');
});

export default router;
