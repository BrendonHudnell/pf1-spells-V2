import React from 'react';
import { Main } from './main';

import './App.scss';

const changeTheme = () => {
	if (document.documentElement.hasAttribute('theme')) {
		document.documentElement.removeAttribute('theme');
		localStorage.removeItem('theme');
	} else {
		document.documentElement.setAttribute('theme', 'dark');
		localStorage.setItem('theme', 'dark');
	}
};

function App() {
	if (localStorage.getItem('theme') === 'dark') {
		document.documentElement.setAttribute('theme', 'dark');
	}

	return (
		<div className="App">
			<div className="content">
				<header>
					<h1>Pathfinder 1E Spell Search</h1>
					<input
						type="checkbox"
						id="themeSwitch"
						className="themeSwitchInput"
						onClick={changeTheme}
					/>
					<label htmlFor="themeSwitch" className="themeSwitchLabel tooltip">
						<span />
					</label>
					<span className="tooltipText">Toggle theme</span>
				</header>
				<br />
				<Main />
			</div>
			<footer>
				<h6>
					Database sourced from{' '}
					<a
						href="http://home.pathfindercommunity.net/home/databases/spells"
						target="_blank"
						rel="noopener noreferrer"
					>
						pathfindercommunity.net
					</a>
					. Designed by Brendon Hudnell. 2020
				</h6>
			</footer>
		</div>
	);
}

export default App;
