import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { SpellEntity } from './spellEntity';
import { buildQuery, processRequest } from './spellService';
import { spellSearchValidator } from './spellValidator';

export function createSpellSearchRouter(): Router {
	const router = Router();

	router.get('/', spellSearchValidator, getSpells);

	return router;
}

export async function getSpells(req: Request, res: Response): Promise<void> {
	const queryObject = processRequest(req.query);

	const spellRepository = getManager().getRepository(SpellEntity);

	const query = buildQuery(queryObject, spellRepository);

	const spells = await query.getMany();

	res.status(200).json(spells);
}
