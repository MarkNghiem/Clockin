import React from 'react';

const StatusDisplay = ({ employeeStatus, wage }) => {
	return (
		<div id='statusDisplay'>
			<ul id='statusDisplayList'>
				<li id='statusDisplayListItem'>
					<strong>Employee Status: </strong>
					{employeeStatus}
				</li>
				<li id='statusDisplayListItem'>
					<strong>Wage: </strong>
					{wage}
				</li>
			</ul>
		</div>
	);
};

export default StatusDisplay;