import { Classes } from './classes';
import { Saves } from './saves';
import { SpellLevels } from './spellLevels';
import { SpellResistances } from './spellResistance';

export interface Parameters {
	searchString: string;
	classes: Classes;
	spellLevels: SpellLevels;
	spellResistance: SpellResistances;
	saves: Saves;
}
