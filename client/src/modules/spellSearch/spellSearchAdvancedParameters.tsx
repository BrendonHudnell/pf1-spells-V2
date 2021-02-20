import React, { Fragment, ReactElement, useState } from 'react';
import {
	Button,
	Collapse,
	FormControlLabel,
	Grid,
	makeStyles,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { GridCheckbox } from '../../components/gridCheckbox';
import { MinusIcon, PlusIcon } from '../../components/icons';
import { savesList, spellResistanceList } from './types';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

export interface SpellSearchAdvancedParametersProps {
	inputRef: (instance: HTMLInputElement | null) => void;
}

export function SpellSearchAdvancedParameters(
	props: SpellSearchAdvancedParametersProps
): ReactElement {
	const [isOpen, setIsOpen] = useState(false);

	const classes = useStyles();

	return (
		<Fragment>
			<Button
				variant="contained"
				onClick={() => setIsOpen(!isOpen)}
				startIcon={isOpen ? <MinusIcon /> : <PlusIcon />}
			>
				&nbsp;&nbsp;Advanced Parameters
			</Button>
			<Collapse in={isOpen} timeout="auto">
				<Typography variant="h4">Spell Resistance:</Typography>
				<RadioGroup row name="spellResistance" defaultValue="either">
					{spellResistanceList.map((resistance) => (
						<FormControlLabel
							key={resistance.value}
							value={resistance.value}
							label={resistance.display}
							inputRef={props.inputRef}
							control={<Radio />}
						/>
					))}
				</RadioGroup>
				<Typography variant="h4">Saves:</Typography>
				<Grid container className={classes.root}>
					{savesList.map((save) => (
						<GridCheckbox
							key={save.value}
							name={`saves.${save.value}`}
							label={save.display}
							inputRef={props.inputRef}
						/>
					))}
				</Grid>
			</Collapse>
		</Fragment>
	);
}
