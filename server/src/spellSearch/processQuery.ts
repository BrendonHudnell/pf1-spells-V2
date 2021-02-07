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
			// text user is searching for
			processObject.searchString = value;
		} else if (key === 'spellResistance' && value.length > 0) {
			// spell resistance (yes, no, either)
			if (value === 'true') {
				processObject.spellResistance = 'yes';
			} else if (value === 'false') {
				processObject.spellResistance = 'no';
			}
		} else if (value === 'true') {
			// only accept true values for now
			if (ClassTypes.includes(key)) {
				// this is a class type parameter
				let newKey = key;
				if (key === 'arcanist') {
					newKey = 'wiz';
				} // arcanist is treated the same as wizard in the database
				else if (key === 'wizard') {
					newKey = 'wiz'; // rename to match database names
				} else if (key === 'sorcerer') {
					newKey = 'sor'; // rename to match database names
				} else if (key === 'medium') {
					newKey = 'spell_medium'; // rename to match database names
				}
				processObject.classes.push(newKey);
			} else if (SaveTypes.includes(key)) {
				// this is a save type parameter
				processObject.saves.push(key);
			} else if (SpellLevelTypes.includes(key)) {
				// this is a spell level parameter
				processObject.spellLevels.push(parseInt(key));
			}
		}
	});

	return processObject;
}
