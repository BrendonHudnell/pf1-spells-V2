import { Router, Request, Response } from 'express';
import { ParsedQuery, parseUrl } from 'query-string';
import { SaveTypes, SpellLevelTypes } from '../../types';
import { spellService } from './spellService';
import { spellSearchValidator } from './spellValidator';

export interface QueryObject {
	searchString: string;
	spellResistance: string;
	classes: string[];
	saves: string[];
	spellLevels: number[];
}

export function createSpellSearchRouter(): Router {
	const router = Router();

	router.get('/', spellSearchValidator, getSpells);

	return router;
}

export async function getSpells(req: Request, res: Response): Promise<void> {
	const queryParams = parseUrl(req.url, { parseBooleans: true }).query;

	const queryObject = processRequest(queryParams);

	const spells = await spellService.getSpells(queryObject);

	res.status(200).json(spells);
}

export function processRequest(
	queryParams: ParsedQuery<string | boolean>
): QueryObject {
	const queryObject: QueryObject = {
		searchString: '',
		spellResistance: '',
		classes: [],
		saves: [],
		spellLevels: [],
	};

	Object.entries(queryParams).forEach((entry) => {
		const [key, value] = entry;

		if (key === 'searchString' && (value as string).length > 0) {
			queryObject.searchString = (value as string).trim();
		} else if (key === 'spellResistance') {
			if (value) {
				queryObject.spellResistance = 'yes';
			} else {
				queryObject.spellResistance = 'no';
			}
		} else if (value) {
			// only accept true values for now
			if (SpellLevelTypes.includes(key)) {
				queryObject.spellLevels.push(parseInt(key));
			} else if (SaveTypes.includes(key)) {
				queryObject.saves.push(key);
			} else {
				// its a class type
				let newKey = key;

				// arcanist is treated the same as wizard in the database
				if (key === 'arcanist') {
					newKey = 'wiz';
				}
				// investigator is a superset of alchemist so add bard to the query
				else if (
					key === 'investigator' &&
					!queryObject.classes.includes('alchemist')
				) {
					queryObject.classes.push('alchemist');
				}
				// skald is a superset of bard so add bard to the query
				else if (key === 'skald' && !queryObject.classes.includes('bard')) {
					queryObject.classes.push('bard');
				} else if (key === 'wizard') {
					newKey = 'wiz'; // rename to match database names
				} else if (key === 'sorcerer') {
					newKey = 'sor'; // rename to match database names
				} else if (key === 'medium') {
					newKey = 'spell_medium'; // rename to match database names
				}

				// only add if it hasnt been added above
				if (!queryObject.classes.includes(newKey)) {
					queryObject.classes.push(newKey);
				}
			}
		}
	});

	return queryObject;
}
