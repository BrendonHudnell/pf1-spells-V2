import { isObjectEmpty } from '../utils';
import { ProcessObject } from './processQuery';

export function createSQLParameters(queryObject: ProcessObject): string {
	// function to determine if queryObject is empty

	// if the queryObject is empty, return
	if (isObjectEmpty(queryObject)) {
		return '';
	}

	let SQLParams = ' WHERE';
	let firstCondition = true;

	// search string
	if (queryObject.searchString.length > 0) {
		SQLParams += ` spell_name LIKE '%${queryObject.searchString}%'`;

		firstCondition = false;
	}

	// spell resistance
	if (queryObject.spellResistance.length > 0) {
		if (!firstCondition) {
			SQLParams += ' AND ';
		}

		SQLParams += ` spell_resistance LIKE '%${queryObject.spellResistance}%'`;
		firstCondition = false;
	}

	// saves
	if (queryObject.saves.length > 0) {
		if (!firstCondition) {
			SQLParams += ' AND ';
		}

		SQLParams += ' (';
		let firstSave = true;

		queryObject.saves.forEach((save) => {
			if (!firstSave) {
				SQLParams += ' OR';
			}
			firstSave = false;

			SQLParams += ` saving_throw LIKE '%${save}%'`;
		});

		SQLParams += ')';

		firstCondition = false;
	}

	// classes and spell levels
	if (queryObject.classes.length > 0 || queryObject.spellLevels.length > 0) {
		if (!firstCondition) {
			SQLParams += ' AND ';
		}

		if (queryObject.spellLevels.length === 0) {
			// only classes
			SQLParams += ' (';
			let firstClass = true;

			queryObject.classes.forEach((myClass) => {
				if (!firstClass) {
					SQLParams += ' OR';
				}
				firstClass = false;

				SQLParams += ` ${myClass} IS NOT NULL`;
			});

			SQLParams += ')';
		} else if (queryObject.classes.length === 0) {
			// only spell levels
			SQLParams += ' (';
			let firstLevel = true;

			queryObject.spellLevels.forEach((spellLevel) => {
				if (!firstLevel) {
					SQLParams += ' OR';
				}
				firstLevel = false;

				SQLParams += ` spell_level LIKE '%${spellLevel}%'`;
			});

			SQLParams += ')';
		} else {
			// both classes and spell levels
			SQLParams += ' (';
			let firstParam = true;

			queryObject.classes.forEach((myClass) => {
				if (!firstParam) {
					SQLParams += ' OR';
				}
				firstParam = false;

				SQLParams += ` ${myClass} IN (`;

				let firstLevel = true;
				queryObject.spellLevels.forEach((spellLevel) => {
					if (!firstLevel) {
						SQLParams += ',';
					}
					firstLevel = false;

					SQLParams += spellLevel;
				});

				SQLParams += ')';
			});

			SQLParams += ')';
		}
	}

	return SQLParams;
}
