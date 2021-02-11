import { URL } from 'url';
import { ClassTypes, SaveTypes, SpellLevelTypes } from '../types';

export interface ProcessObject {
	searchString: string;
	spellResistance: string;
	classes: string[];
	saves: string[];
	spellLevels: number[];
}

export function processQuery(url: URL): ProcessObject {
	const processObject: ProcessObject = {
		searchString: '',
		spellResistance: '',
		classes: [],
		saves: [],
		spellLevels: [],
	};

	url.searchParams.forEach((value, key) => {
		if (key === 'searchString' && value.length > 0) {
			processObject.searchString = value;
		} else if (key === 'spellResistance' && value.length > 0) {
			if (value === 'true') {
				processObject.spellResistance = 'yes';
			} else if (value === 'false') {
				processObject.spellResistance = 'no';
			}
		} else if (value === 'true') {
			// only accept true values for now
			if (ClassTypes.includes(key)) {
				let newKey = key;
				// arcanist is treated the same as wizard in the database
				if (key === 'arcanist') {
					newKey = 'wiz';
				}
				// investigator is a superset of alchemist so add bard to the query
				if (key === 'investigator') {
					processObject.classes.push('alchemist');
				}
				// skald is a superset of bard so add bard to the query
				if (key === 'skald') {
					processObject.classes.push('bard');
				} else if (key === 'wizard') {
					newKey = 'wiz'; // rename to match database names
				} else if (key === 'sorcerer') {
					newKey = 'sor'; // rename to match database names
				} else if (key === 'medium') {
					newKey = 'spell_medium'; // rename to match database names
				}
				processObject.classes.push(newKey);
			} else if (SaveTypes.includes(key)) {
				processObject.saves.push(key);
			} else if (SpellLevelTypes.includes(key)) {
				processObject.spellLevels.push(parseInt(key));
			}
		}
	});

	return processObject;
}
