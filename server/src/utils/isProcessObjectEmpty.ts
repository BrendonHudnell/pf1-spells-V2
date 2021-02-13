import { ProcessObject } from '../routes/spellSearch';

export function isProcessObjectEmpty(myObject: ProcessObject): boolean {
	const values = Object.values(myObject);
	for (let i = 0; i < values.length; i++) {
		if (values[i].length > 0) {
			return false;
		}
	}
	return true;
}
