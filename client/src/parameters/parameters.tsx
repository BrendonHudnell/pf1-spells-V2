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
import { GridCheckbox } from '../gridCheckbox';
import { TableData } from '../table';
import { classList, Parameters, spellLevelList } from './types';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

export interface SearchParametersProps {
	onUpdate: (newData: TableData[]) => void;
}

export function SearchParameters(props: SearchParametersProps): ReactElement {
	const classes = useStyles();

	const { register, handleSubmit } = useForm();

	function onSubmit(parameters: Parameters) {
		// if there are no parameters, dont send request
		if (isParametersEmpty(parameters)) {
			return;
		}

		const queryBase = '/api/spellsearch?';
		let queryParams = '';

		// searchString
		queryParams += `searchString=${parameters.searchString}`;
		// classes
		Object.entries(parameters.classes).forEach((entry) => {
			if (entry[1]) {
				queryParams += `&${entry[0]}=${entry[1]}`;
			}
		});
		// spellLevels
		Object.entries(parameters.spellLevels).forEach((entry) => {
			if (entry[1]) {
				queryParams += `&${entry[0]}=${entry[1]}`;
			}
		});
		// spellResistance
		if (parameters.spellResistance !== 'either') {
			queryParams += `spellResistance=${parameters.spellResistance}`;
		}
		// saves
		Object.entries(parameters.saves).forEach((entry) => {
			if (entry[1]) {
				queryParams += `&${entry[0]}=${entry[1]}`;
			}
		});

		const queryString = queryBase + queryParams;

		console.log(queryString);

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

	function isParametersEmpty(parameters: Parameters) {
		// searchString
		if (parameters.searchString.length > 0) {
			return false;
		}
		// classes
		const classes: boolean[] = Object.values(parameters.classes);
		for (const value of classes) {
			if (value === true) {
				return false;
			}
		}
		// spellLevels
		const levels: boolean[] = Object.values(parameters.spellLevels);
		for (const value of levels) {
			if (value === true) {
				return false;
			}
		}
		// spellResistance
		if (parameters.spellResistance !== 'either') {
			return false;
		}
		// saves
		const saves: boolean[] = Object.values(parameters.saves);
		for (const value of saves) {
			if (value === true) {
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
						name={`classes.${classe.value}`}
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
							name={`spellLevels.${level.value}`}
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
