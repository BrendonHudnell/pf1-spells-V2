export function isObjectEmpty(myObject: Record<string, any>): boolean {
	const values = Object.values(myObject);
	for (let i = 0; i < values.length; i++) {
		if (values[i].length > 0) {
			return false;
		}
	}
	return true;
}
