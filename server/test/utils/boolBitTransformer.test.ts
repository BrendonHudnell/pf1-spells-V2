import { BoolBitTransformer } from '../../src/utils';

describe('boolBitTransformer', () => {
	describe('from typeorm to db', () => {
		it('should transform true to a 1 bit', () => {
			const transformer = new BoolBitTransformer();

			const buffer = transformer.to(true);

			expect(buffer![0]).toEqual(1);
		});

		it('should transform false to a 0 bit', () => {
			const transformer = new BoolBitTransformer();

			const buffer = transformer.to(false);

			expect(buffer![0]).toEqual(0);
		});

		it('should not transform null', () => {
			const transformer = new BoolBitTransformer();

			const buffer = transformer.to(null);

			expect(buffer).toBeNull();
		});
	});

	describe('from db to typeorm', () => {
		it('should transform a 1 bit to true', () => {
			const transformer = new BoolBitTransformer();
			const buffer = Buffer.alloc(1);

			buffer[0] = 1;

			const boolean = transformer.from(buffer);

			expect(boolean!).toBe(true);
		});

		it('should transform a 0 bit to false', () => {
			const transformer = new BoolBitTransformer();
			const buffer = Buffer.alloc(1);

			buffer[0] = 0;

			const boolean = transformer.from(buffer);

			expect(boolean!).toBe(false);
		});

		it('should not transform null', () => {
			const transformer = new BoolBitTransformer();
			const buffer = Buffer.alloc(1);

			buffer[0] = 1;

			const boolean = transformer.from(null);

			expect(boolean).toBeNull();
		});
	});
});
