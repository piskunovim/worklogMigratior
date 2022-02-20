import React, { useContext } from 'react';
import UserPicker from 'components/UserPicker';
import IssuePicker from 'components/IssuePicker';
import WorklogPicker from 'components/WorklogPicker';
import { H2 } from 'components/Heading';
import Block from 'components/Block';

import { ContextApp } from './context/reducer';
import types from './context/types';

const WorklogsMigrator = () => {
	const { state, dispatch } = useContext(ContextApp);
	
	const handleChangeIssue = (newIssues) => {
		dispatch({
			type: types.SET_ISSUES,
			payload: {
				users: newIssues,
			},
		});
	};
	
	const handleChangeUser = (newUsers) => {
		dispatch({
			type: types.SET_USERS,
			payload: {
				users: newUsers,
			},
		});
	};

	return (
		<Block>
			<H2>Worklogs Manager</H2>

			<Block type='flex'>
				<IssuePicker
					id='worklog-issue-picker'
					value={state.issues}
					onChange={handleChangeIssue}
				/>
				<UserPicker
					id='worklog-user-picker'
					value={state.users}
					onChange={handleChangeUser}
				/>
			</Block>

			<Block>
				<WorklogPicker />
			</Block>
		</Block>
	);
};

export default WorklogsMigrator;
