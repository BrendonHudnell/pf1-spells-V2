import { Repository, SelectQueryBuilder, Brackets } from 'typeorm';
import { SpellEntity } from './spellEntity';
import { ClassTypes, SaveTypes, SpellLevelTypes } from '../../types';
import { isProcessObjectEmpty } from '../../utils';

export interface ProcessObject {
	searchString: string;
	spellResistance: string;
	classes: string[];
	saves: string[];
	spellLevels: number[];
}

export function processRequest(queryParams: qs.ParsedQs): ProcessObject {
	const processObject: ProcessObject = {
		searchString: '',
		spellResistance: '',
		classes: [],
		saves: [],
		spellLevels: [],
	};

	Object.entries(queryParams).forEach((entry) => {
		const [key, tempValue] = entry;
		const value = tempValue as string;
		if (key === 'searchString' && value.length > 0) {
			processObject.searchString = value.trim();
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

export function buildQuery(
	queryObject: ProcessObject,
	spellRepository: Repository<SpellEntity>
): SelectQueryBuilder<SpellEntity> {
	const builder = spellRepository
		.createQueryBuilder('spell')
		.select([
			'spell.spell_name',
			'spell.description_formatted',
			'spell.short_description',
			'spell.spell_level',
			'spell.saving_throw',
			'spell.spell_resistance',
		]);

	// if the queryObject is empty, return
	if (isProcessObjectEmpty(queryObject)) {
		return builder;
	}

	let firstCondition = true;

	// search string
	if (queryObject.searchString.length > 0) {
		builder.where('spell.spell_name LIKE :searchString', {
			searchString: `%${queryObject.searchString}%`,
		});

		firstCondition = false;
	}

	// spell resistance
	if (queryObject.spellResistance.length > 0) {
		const statement = `spell.spell_resistance LIKE '%${queryObject.spellResistance}%'`;
		if (firstCondition) {
			builder.where(statement);
			firstCondition = false;
		} else {
			builder.andWhere(statement);
		}
	}

	// saves
	if (queryObject.saves.length > 0) {
		let firstSave = true;
		const statement = new Brackets((qb) => {
			queryObject.saves.forEach((save) => {
				const statement = `spell.saving_throw LIKE '%${save}%'`;
				if (firstSave) {
					qb.where(statement);
					firstSave = false;
				} else {
					qb.orWhere(statement);
				}
			});
		});

		if (firstCondition) {
			builder.where(statement);
			firstCondition = false;
		} else {
			builder.andWhere(statement);
		}
	}

	// classes and spell levels
	if (queryObject.classes.length > 0 || queryObject.spellLevels.length > 0) {
		let firstParam = true;
		let statement: Brackets;

		// only classes
		if (queryObject.spellLevels.length === 0) {
			statement = new Brackets((qb) => {
				queryObject.classes.forEach((myClass) => {
					const statement = `spell.${myClass} IS NOT NULL`;
					if (firstParam) {
						qb.where(statement);
						firstParam = false;
					} else {
						qb.orWhere(statement);
					}
				});
			});
		}
		// only spell levels
		else if (queryObject.classes.length === 0) {
			statement = new Brackets((qb) => {
				queryObject.spellLevels.forEach((spellLevel) => {
					const statement = `spell.spell_level LIKE '%${spellLevel}%'`;
					if (firstParam) {
						qb.where(statement);
						firstParam = false;
					} else {
						qb.orWhere(statement);
					}
				});
			});
		}
		// both classes and spell levels
		else {
			statement = new Brackets((qb) => {
				queryObject.classes.forEach((myClass) => {
					const statement = `spell.${myClass} IN (:...spellLevels)`;
					if (firstParam) {
						qb.where(statement, { spellLevels: queryObject.spellLevels });
						firstParam = false;
					} else {
						qb.orWhere(statement, { spellLevels: queryObject.spellLevels });
					}
				});
			});
		}

		if (firstCondition) {
			builder.where(statement);
			firstCondition = false;
		} else {
			builder.andWhere(statement);
		}
	}

	return builder;
}
