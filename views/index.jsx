import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useReducer } from 'react';
import './global.css';

import { ContextApp, initialState, reducer } from './context/reducer.js';
import WorklogsMigrator from './worklogs-migrator';

const index = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ContextApp.Provider value={{ dispatch, state }}>
      <WorklogsMigrator />
		</ContextApp.Provider>
	);
};

export default index;
