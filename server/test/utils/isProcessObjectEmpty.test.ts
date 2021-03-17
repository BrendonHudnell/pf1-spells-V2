import { ProcessObject } from '../../src/modules/spellSearch';
import { isProcessObjectEmpty } from '../../src/utils';

describe('isProcessObjectEmpty', () => {
	it('should return true for an empty object', () => {
		const object: ProcessObject = {
			searchString: '',
			spellResistance: '',
			classes: [],
			saves: [],
			spellLevels: [],
		};

		const isEmpty = isProcessObjectEmpty(object);

		expect(isEmpty).toBe(true);
	});

	it('should return false for a non-empty object', () => {
		const object: ProcessObject = {
			searchString: 'not',
			spellResistance: 'empty',
			classes: ['still'],
			saves: ['not empty'],
			spellLevels: [123],
		};

		const isEmpty = isProcessObjectEmpty(object);

		expect(isEmpty).toBe(false);
	});
});
