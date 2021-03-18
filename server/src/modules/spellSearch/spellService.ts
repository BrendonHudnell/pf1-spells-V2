import {
	Repository,
	SelectQueryBuilder,
	Brackets,
	getRepository,
} from 'typeorm';
import { SpellEntity } from './spellEntity';
import { QueryObject } from './spellRouter';

export const spellService = {
	async getSpells(queryObject: QueryObject): Promise<SpellEntity[]> {
		const spellRepository = getRepository(SpellEntity);

		const query = this.buildQuery(queryObject, spellRepository);

		const spells = await query.getMany();

		return spells;
	},

	buildQuery(
		queryObject: QueryObject,
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
		if (this.isQueryObjectEmpty(queryObject)) {
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
	},

	isQueryObjectEmpty(queryObject: QueryObject): boolean {
		const values = Object.values(queryObject);
		for (let i = 0; i < values.length; i++) {
			if (values[i].length > 0) {
				return false;
			}
		}
		return true;
	},
};
