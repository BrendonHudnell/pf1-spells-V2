import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { SpellEntity } from './spellEntity';
import { createSQLParameters, processQuery } from './spellService';
import { spellSearchValidator } from './spellValidator';

export function createSpellSearchRouter(): Router {
	const router = Router();

	router.get('/', spellSearchValidator, getSpells);

	return router;
}

export async function getSpells(req: Request, res: Response): Promise<void> {
	const queryObject = processQuery(req.query);

	const spellRepository = getManager().getRepository(SpellEntity);

	const query = createSQLParameters(queryObject, spellRepository);

	const spells = await query.getMany();

	res.json(spells);
}
