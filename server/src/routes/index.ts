import { Router, Request, Response } from 'express';
import { createSpellSearchRouter } from './spellSearch';

const router = Router();

router.use('/spellsearch', createSpellSearchRouter());

router.get('/', (req: Request, res: Response): void => {
	res.status(200).send('You have reached the API');
});

router.get('*', (req: Request, res: Response): void => {
	res.sendStatus(404);
});

export default router;
