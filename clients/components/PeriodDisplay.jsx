import React from 'react';

const PeriodDisplay = ({ currentPeriod, total_hrs }) => {
	return (
		<div id='periodDisplay'>
			<ul id='periodDisplayList'>
				<li id='periodDisplayListItem'>
					<strong>Current Period: </strong>
					{currentPeriod}
				</li>
				<li id='periodDisplayListItem'>
					<strong>Current Total Hours: </strong>
					{total_hrs}
				</li>
			</ul>
		</div>
	);
};

export default PeriodDisplay;
