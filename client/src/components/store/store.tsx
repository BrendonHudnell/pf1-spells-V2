import React, {
	createContext,
	Dispatch,
	ReactElement,
	useReducer,
} from 'react';

export type Action = { type: 'TOGGLE_DARK_MODE' };

export interface State {
	darkMode: boolean;
}

export const initialState: State = {
	darkMode: localStorage.getItem('theme') === 'dark',
};

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'TOGGLE_DARK_MODE': {
			return { darkMode: !state.darkMode };
		}
		default:
			return state;
	}
}

export const AppContext = createContext<{
	state: State;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => {},
});

export function AppProvider(props: any): ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{props.children}
		</AppContext.Provider>
	);
}
