import React, { ReactElement } from 'react';
import {
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { AdvancedParameters } from './advancedParameters';
import { GridCheckbox } from './gridCheckbox';
import { classList, spellLevelList } from './parameterTypes';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

export interface ParametersProps {
	onUpdate: (newData: Record<string, any>[]) => void;
}

export function Parameters(props: ParametersProps): ReactElement {
	const classes = useStyles();

	const { register, handleSubmit } = useForm();

	function onSubmit(parameters: Record<string, any>) {
		console.log(parameters);

		// if there are no parameters, dont send request
		if (isStateEmpty(parameters)) {
			return;
		}

		const queryBase = '/api/spellsearch?';
		let queryParams = '';

		Object.entries(parameters).forEach((entry) => {
			queryParams += `${entry[0]}=${entry[1]}&`;
		});
		const queryString = queryBase + queryParams.slice(0, -1);

		fetch(queryString)
			.then((res) => res.json())
			.then(
				(result) => {
					props.onUpdate(result);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	function isStateEmpty(parameters: Record<string, any>) {
		const entries = Object.entries(parameters);
		for (let i = 0; i < entries.length; i++) {
			if (entries[i][0] === 'searchString' && entries[i][1].length > 0) {
				// searchString
				return false;
			} else if (
				entries[i][0] === 'spellResistance' &&
				entries[i][1] !== 'either'
			) {
				// spellResistance
				return false;
			} else if (entries[i][1] === true) {
				// the rest
				return false;
			}
		}
		return true;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				variant="outlined"
				size="small"
				name="searchString"
				inputRef={register()}
			/>
			<Button variant="contained" type="submit">
				<Typography>Search</Typography>
			</Button>
			<Typography variant="h4">Class:</Typography>
			<Grid container className={classes.root}>
				{classList.map((classe) => (
					<GridCheckbox
						key={classe.value}
						name={classe.value}
						label={classe.display}
						inputRef={register()}
					/>
				))}
			</Grid>
			<Typography variant="h4">Spell level:</Typography>
			<Grid container className={classes.root}>
				{spellLevelList.map((level) => {
					return (
						<GridCheckbox
							key={level.value}
							name={level.value}
							label={level.display}
							inputRef={register()}
						/>
					);
				})}
			</Grid>
			<AdvancedParameters inputRef={register} />
		</form>
	);
}
