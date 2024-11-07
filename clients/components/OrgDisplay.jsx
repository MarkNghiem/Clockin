import React from 'react';

const OrgDisplay = ({ company }) => {
	return (
		<div id='orgDisplay'>
			<span><strong>Your Organization: </strong>{company}</span>
		</div>
	);
};

export default OrgDisplay;