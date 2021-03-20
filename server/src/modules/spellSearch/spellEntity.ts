import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BoolBitTransformer } from '../../utils';

@Entity('spells')
export class SpellEntity {
	@PrimaryColumn({ length: 36 })
	spell_name!: string;

	@Column({ length: 13 })
	school!: string;

	@Column({ length: 23, nullable: true })
	subschool?: string;

	@Column({ length: 49, nullable: true })
	descriptor?: string;

	@Column({ length: 213 })
	spell_level!: string;

	@Column({ length: 47 })
	casting_time!: string;

	@Column({ length: 191 })
	components!: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	costly_components!: boolean;

	@Column({ length: 74, nullable: true })
	spell_range?: string;

	@Column({ length: 94, nullable: true })
	area?: string;

	@Column({ length: 156, nullable: true })
	effect?: string;

	@Column({ length: 185, nullable: true })
	targets?: string;

	@Column({ length: 81, nullable: true })
	duration?: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	dismissible!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	shapeable!: boolean;

	@Column({ length: 73, nullable: true })
	saving_throw?: string;

	@Column({ length: 40, nullable: true })
	spell_resistance?: string;

	@Column({ type: 'text' })
	spell_description!: string;

	@Column({ type: 'text' })
	description_formatted!: string;

	@Column({ length: 44 })
	spell_source!: string;

	@Column({ type: 'text' })
	full_text!: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	verbal!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	somatic!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	material!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	focus!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	divine_focus!: boolean;

	@Column({ nullable: true })
	sor?: number;

	@Column({ nullable: true })
	wiz?: number;

	@Column({ nullable: true })
	cleric?: number;

	@Column({ nullable: true })
	druid?: number;

	@Column({ nullable: true })
	ranger?: number;

	@Column({ nullable: true })
	bard?: number;

	@Column({ nullable: true })
	paladin?: number;

	@Column({ nullable: true })
	alchemist?: number;

	@Column({ nullable: true })
	summoner?: number;

	@Column({ nullable: true })
	witch?: number;

	@Column({ nullable: true })
	inquisitor?: number;

	@Column({ nullable: true })
	oracle?: number;

	@Column({ nullable: true })
	antipaladin?: number;

	@Column({ nullable: true })
	magus?: number;

	@Column({ nullable: true })
	adept?: number;

	@Column({ length: 14, nullable: true })
	deity?: string;

	@Column({ nullable: true })
	SLA_Level?: number;

	@Column({ length: 83, nullable: true })
	domain?: string;

	@Column({ length: 155, nullable: true })
	short_description?: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	acid!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	air!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	chaotic!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	cold!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	curse!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	darkness!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	death!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	disease!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	earth!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	electricity!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	emotion!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	evil!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	fear!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	fire!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	spell_force!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	good!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	language_dependent!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	lawful!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	light!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	mind_affecting!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	pain!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	poison!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	shadow!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	sonic!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	water!: boolean;

	@Column({ length: 32, nullable: true })
	linktext?: string;

	@Column()
	id!: number;

	@Column({ nullable: true })
	material_costs?: number;

	@Column({ length: 106, nullable: true })
	bloodline?: string;

	@Column({ length: 58, nullable: true })
	patron?: string;

	@Column({ length: 896, nullable: true })
	mythic_text?: string;

	@Column({ length: 496, nullable: true })
	augmented?: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	mythic!: boolean;

	@Column({ nullable: true })
	bloodrager?: number;

	@Column({ nullable: true })
	shaman?: number;

	@Column({ nullable: true })
	psychic?: number;

	@Column({ nullable: true })
	spell_medium?: number;

	@Column({ nullable: true })
	mesmerist?: number;

	@Column({ nullable: true })
	occultist?: number;

	@Column({ nullable: true })
	spiritualist?: number;

	@Column({ nullable: true })
	skald?: number;

	@Column({ nullable: true })
	investigator?: number;

	@Column({ nullable: true })
	hunter?: number;

	@Column({ length: 207, nullable: true })
	haunt_statistics?: string;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	ruse!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	draconic!: boolean;

	@Column({ type: 'bit', transformer: new BoolBitTransformer() })
	meditative!: boolean;

	@Column({ nullable: true })
	summoner_unchained?: number;
}
