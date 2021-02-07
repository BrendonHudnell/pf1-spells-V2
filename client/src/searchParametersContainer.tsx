import React, { ChangeEvent, FormEvent, useState } from 'react';
import { BasicParameters } from './basicParameters';
import { AdvancedParameters } from './advancedParameters';

export interface SearchParametersContainerProps {
	onUpdate: (newData: Record<string, any>[]) => void;
}

export function SearchParametersContainer(
	props: SearchParametersContainerProps
) {
	const [parameters, setParameters] = useState({} as Record<string, any>);

	function isStateEmpty() {
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

	function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
		setParameters({
			...parameters,
			[event.target.value]: event.target.checked,
		});
	}

	function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
		setParameters({ ...parameters, searchString: event.target.value });
	}

	function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
		setParameters({ ...parameters, spellResistance: event.target.value });
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		// prevent default form submit behavior
		event.preventDefault();

		// if there are no parameters, dont send request
		if (isStateEmpty()) {
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

	return (
		<div className="parameters">
			<BasicParameters
				onCheckboxChange={handleCheckboxChange}
				onSubmit={handleSubmit}
				onTextChange={handleTextChange}
			/>
			<br />
			<AdvancedParameters
				onCheckboxChange={handleCheckboxChange}
				onRadioChange={handleRadioChange}
			/>
		</div>
	);
}
