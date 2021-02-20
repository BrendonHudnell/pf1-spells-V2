import React from 'react';
import ReactDOM from 'react-dom';
import { ShellView } from './modules/shell';
import { AppProvider } from './components/store';

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<ShellView />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
