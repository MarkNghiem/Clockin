import React from 'react';

const OrgDisplay = ({ company }) => {
	return (
		<div id='orgDisplay'>
			<h4>Your Organization: </h4>
			<span>{company}</span>
		</div>
	);
};

export default OrgDisplay;