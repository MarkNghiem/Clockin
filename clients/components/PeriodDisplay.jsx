import React from 'react';

const PeriodDisplay = ({ currentPeriod, totalHrs }) => {
	return (
		<div id='periodDisplay'>
			<ul id='periodDisplayList'>
				<li id='periodDisplayListItem'>
					<strong>Current Period: </strong>
					{currentPeriod}
				</li>
				<li id='periodDisplayListItem'>
					<strong>Current Total Hours: </strong>
					{totalHrs}
				</li>
			</ul>
		</div>
	);
};

export default PeriodDisplay;
