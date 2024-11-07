import React from 'react';

const AdminDisplay = ({ setAddPopUp, setFindPopUp, setUpdatePopUp, setDeletePopUp, setCalcPopUp }) => {
	return (
		<div id='adminDisplay'>
			<ul id='adminDisplayList'>
				<li id='adminDisplayListItem'>
					<button
						id='addButton'
						onClick={() => setAddPopUp(true)}
					>
						<strong>Add Employee</strong>
					</button>
				</li>
				<li id='adminDisplayListItem'>
					<button
						id='findButton'
						onClick={() => setFindPopUp(true)}
					>
						<strong>Find Employee</strong>
					</button>
				</li>
				<li id='adminDisplayListItem'>
					<button
						id='updateButton'
						onClick={() => setUpdatePopUp(true)}
					>
						<strong>Update Employee's Info</strong>
					</button>
				</li>
				<li id='adminDisplayListItem'>
					<button
						id='removeButton'
						onClick={() => setDeletePopUp(true)}
					>
						<strong>Remove Employee</strong>
					</button>
				</li>
				<li id='adminDisplayListItem'>
					<button
						id='CalcButton'
						onClick={() => setCalcPopUp(true)}
					>
						<strong>Calculator</strong>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default AdminDisplay;
