import React, {
	ChangeEvent,
	ChangeEventHandler,
	ReactElement,
	useState,
} from 'react';

const saves = [
	{ value: 'fortitude', display: 'Fortitude' },
	{ value: 'reflex', display: 'Reflex' },
	{ value: 'will', display: 'Will' },
	{ value: 'none', display: 'None' },
];

const spellResistance = [
	{ value: 'true', display: 'Yes' },
	{ value: 'false', display: 'No' },
	{ value: 'either', display: 'Either' },
];

export interface AdvancedParametersProps {
	onCheckboxChange: ChangeEventHandler<HTMLInputElement>;
	onRadioChange: ChangeEventHandler<HTMLInputElement>;
}

export function AdvancedParameters(
	props: AdvancedParametersProps
): ReactElement {
	const [isOpened, setIsOpened] = useState(false);
	const [selectedOption, setSelectedOption] = useState('either');

	function createCheckboxRow(checkboxArray: Record<string, string>[]) {
		return checkboxArray.map((element) => {
			return (
				<td key={element.display}>
					<label>
						<input
							type="checkbox"
							value={element.value}
							onChange={props.onCheckboxChange}
						/>
						{element.display}
					</label>
				</td>
			);
		});
	}

	function createRadioButtonRow(radioArray: Record<string, string>[]) {
		return radioArray.map((element) => {
			return (
				<td key={element.display}>
					<label>
						<input
							type="radio"
							value={element.value}
							checked={selectedOption === element.value}
							onChange={handleChecked}
						/>
						{element.display}
					</label>
				</td>
			);
		});
	}

	function handleChecked(event: ChangeEvent<HTMLInputElement>) {
		setSelectedOption(event.target.value);
		props.onRadioChange(event);
	}

	function handleClicked() {
		setIsOpened(!isOpened);
	}

	return (
		<div>
			<button
				className={isOpened ? 'collapsible active' : 'collapsible'}
				onClick={handleClicked}
			>
				&nbsp;&nbsp;Advanced Parameters
			</button>
			<div className={isOpened ? '' : 'hidden'}>
				<h4>Spell Resistance:</h4>
				<table>
					<tbody>
						<tr>{createRadioButtonRow(spellResistance)}</tr>
					</tbody>
				</table>
				<h4>Saves:</h4>
				<table>
					<tbody>
						<tr>{createCheckboxRow(saves)}</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
