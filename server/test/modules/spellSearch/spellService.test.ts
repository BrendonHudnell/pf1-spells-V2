import sinon from 'sinon';
import { getRepository } from 'typeorm';
import {
	QueryObject,
	SpellEntity,
	spellService,
} from '../../../src/modules/spellSearch';
import { connection } from '../../../src/utils';

describe('spellService', () => {
	beforeAll(async () => await connection.create());
	afterAll(async () => await connection.close());

	describe('getSpells', () => {
		const sandbox = sinon.createSandbox();
		afterEach(() => sandbox.restore());

		it('should return all spells when queryObject is empty', async () => {
			sandbox
				.stub(spellService, 'buildQuery')
				.callsFake((queryObject, spellRepository) =>
					spellRepository
						.createQueryBuilder('spell')
						.select([
							'spell.spell_name',
							'spell.description_formatted',
							'spell.short_description',
							'spell.spell_level',
							'spell.saving_throw',
							'spell.spell_resistance',
						])
				);

			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [],
			};

			const spells = await spellService.getSpells(queryObject);

			expect(spells.length).toBe(2905);
		});
	});

	describe('buildQuery', () => {
		it('should return the correct builder with an empty queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);

			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell`'
			);
		});

		it('should return the correct builder with only searchString in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ?'
			);
		});

		it('should return the correct builder with only spellResistance in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: 'yes',
				classes: [],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_resistance` LIKE '%yes%'"
			);
		});

		it('should return the correct builder with searchString and spellResistance in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: 'yes',
				classes: [],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ? AND `spell`.`spell_resistance` LIKE '%yes%'"
			);
		});

		it('should return the correct builder with only saves in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: [],
				saves: ['reflex', 'will'],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE (`spell`.`saving_throw` LIKE '%reflex%' OR `spell`.`saving_throw` LIKE '%will%')"
			);
		});

		it('should return the correct builder with searchString and saves in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: '',
				classes: [],
				saves: ['reflex', 'will'],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ? AND (`spell`.`saving_throw` LIKE '%reflex%' OR `spell`.`saving_throw` LIKE '%will%')"
			);
		});

		it('should return the correct builder with only classes in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: ['sor', 'wiz'],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE (`spell`.`sor` IS NOT NULL OR `spell`.`wiz` IS NOT NULL)'
			);
		});

		it('should return the correct builder with searchString and classes in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: '',
				classes: ['sor', 'wiz'],
				saves: [],
				spellLevels: [],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ? AND (`spell`.`sor` IS NOT NULL OR `spell`.`wiz` IS NOT NULL)'
			);
		});

		it('should return the correct builder with only spellLevels in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [0, 1],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE (`spell`.`spell_level` LIKE '%0%' OR `spell`.`spell_level` LIKE '%1%')"
			);
		});

		it('should return the correct builder with searchString and spellLevels in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [0, 1],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				"SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ? AND (`spell`.`spell_level` LIKE '%0%' OR `spell`.`spell_level` LIKE '%1%')"
			);
		});

		it('should return the correct builder with classes and spellLevels in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: ['sor', 'wiz'],
				saves: [],
				spellLevels: [0, 1],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE (`spell`.`sor` IN (?) OR `spell`.`wiz` IN (?))'
			);
		});

		it('should return the correct builder with searchString, classes, and spellLevels in the queryObject', () => {
			const queryObject: QueryObject = {
				searchString: 'searchString',
				spellResistance: '',
				classes: ['sor', 'wiz'],
				saves: [],
				spellLevels: [0, 1],
			};
			const repository = getRepository(SpellEntity);
			const builder = spellService.buildQuery(queryObject, repository);

			expect(builder.getSql()).toBe(
				'SELECT `spell`.`spell_name` AS `spell_spell_name`, `spell`.`spell_level` AS `spell_spell_level`, `spell`.`saving_throw` AS `spell_saving_throw`, `spell`.`spell_resistance` AS `spell_spell_resistance`, `spell`.`description_formatted` AS `spell_description_formatted`, `spell`.`short_description` AS `spell_short_description` FROM `spells` `spell` WHERE `spell`.`spell_name` LIKE ? AND (`spell`.`sor` IN (?) OR `spell`.`wiz` IN (?))'
			);
		});
	});

	describe('isQueryObjectEmpty', () => {
		it('should return true for an empty object', () => {
			const object: QueryObject = {
				searchString: '',
				spellResistance: '',
				classes: [],
				saves: [],
				spellLevels: [],
			};

			const isEmpty = spellService.isQueryObjectEmpty(object);

			expect(isEmpty).toBe(true);
		});

		it('should return false for a non-empty object', () => {
			const object: QueryObject = {
				searchString: 'not',
				spellResistance: 'empty',
				classes: ['still'],
				saves: ['not empty'],
				spellLevels: [123],
			};

			const isEmpty = spellService.isQueryObjectEmpty(object);

			expect(isEmpty).toBe(false);
		});
	});
});
