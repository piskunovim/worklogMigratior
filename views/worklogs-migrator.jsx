import React from 'react';
import UserPicker from 'components/UserPicker';
import IssuePicker from 'components/IssuePicker';
import WorklogPicker from 'components/WorklogPicker';
import { H2 } from 'components/Heading';
import Block from 'components/Block';

import './global.css';

const WorklogsMigrator = () => (
	<Block>
		<H2>Worklogs Manager</H2>

		<Block type='flex'>
			<IssuePicker /> <UserPicker />
		</Block>

		<Block>
			<WorklogPicker />
		</Block>
	</Block>
);


export default WorklogsMigrator;
