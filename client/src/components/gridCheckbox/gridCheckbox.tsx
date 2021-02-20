import React, { ReactElement } from 'react';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

export interface GridCheckboxProps {
	name: string;
	label: string;
	inputRef: (instance: HTMLInputElement | null) => void;
}

export function GridCheckbox(props: GridCheckboxProps): ReactElement {
	return (
		<Grid item>
			<FormControlLabel
				control={<Checkbox name={props.name} inputRef={props.inputRef} />}
				label={props.label}
			/>
		</Grid>
	);
}
