import React, { ReactElement, useState } from 'react';
import {
	Box,
	Button,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import ky from 'ky';
import { GridCheckbox } from '../../components/gridCheckbox';
import { classList, Parameters, spellLevelList, TableData } from './types';
import { SpellSearchAdvancedParameters } from './spellSearchAdvancedParameters';
import { SpellTable } from './spellTable';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

export function SpellSearchView(): ReactElement {
	const [tableData, setTableData] = useState<TableData[] | undefined>(
		undefined
	);

	const classes = useStyles();

	const { register, handleSubmit } = useForm();

	function onSubmit(parameters: Parameters): void {
		const queryBase = '/api/spellsearch';
		const searchParams: { [key: string]: string | number | boolean } = {};

		// searchString
		if (parameters.searchString.length > 0) {
			searchParams['searchString'] = parameters.searchString;
		}
		// classes
		Object.entries(parameters.classes).forEach((entry) => {
			if (entry[1]) {
				searchParams[entry[0]] = entry[1];
			}
		});
		// spellLevels
		Object.entries(parameters.spellLevels).forEach((entry) => {
			if (entry[1]) {
				searchParams[entry[0]] = entry[1];
			}
		});
		// spellResistance
		if (parameters.spellResistance !== 'either') {
			searchParams['spellResistance'] = parameters.spellResistance;
		}
		// saves
		Object.entries(parameters.saves).forEach((entry) => {
			if (entry[1]) {
				searchParams[entry[0]] = entry[1];
			}
		});

		// if there are no parameters, dont send request
		if (Object.keys(searchParams).length === 0) {
			return;
		}

		ky.get(queryBase, { searchParams })
			.then((res) => res.json())
			.then(
				(result) => {
					setTableData(result);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	return (
		<Paper elevation={3} className={classes.root}>
			<Box padding={3}>
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
					<Grid container>
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
					<SpellSearchAdvancedParameters inputRef={register} />
				</form>
				{tableData ? <SpellTable rowData={tableData} /> : null}
			</Box>
		</Paper>
	);
}
