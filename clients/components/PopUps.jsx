import React, { useState } from 'react';
import { addEmployee } from '../reducers/employeeReducer';
import { useDispatch } from 'react-redux';

const SERVER_URL = 'http://localhost:3000';

export const AddPopUp = ({ addPopUp, setAddPopUp }) => {
	// const dispatch = useDispatch();

	const initialValues = {
		name: '',
		title: '',
		status: '',
		wage: '',
		total_hrs: '0.00',
		company: 'FTRI-51',
	};

	const [val, setVal] = useState(initialValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log(value);
		setVal({
			...val,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(SERVER_URL + '/api/employee', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(val),
			});

			// Read response body once
			const data = await response.json();
			if (!response.ok) {
				// Log error details if the response status is not OK
				throw new Error(
					`Server responded with status ${
						response.status
					}: ${JSON.stringify(data)}`
				);
			}

			console.log(data); // Log successful response data
			// dispatch(addEmployee(state, data));
		} catch (err) {
			console.error(
				`Error occurred while adding new employee: ${err.message}`
			);
		}
	};

	return addPopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Add New Employee</h4>
				<form onSubmit={handleSubmit}>
					<label htmlFor='addEmployee'>Add New Employee</label>
					<input
						value={val.name}
						onChange={handleInputChange}
						name='name'
						label='Name'
						placeholder='Enter Your Name'
					/>
					<input
						value={val.title}
						onChange={handleInputChange}
						name='title'
						label='Title'
						placeholder='Enter Your Title'
					/>
					<input
						value={val.status}
						onChange={handleInputChange}
						name='status'
						label='Status'
						placeholder='Full-time or Part-time'
					/>
					<input
						value={val.wage}
						onChange={handleInputChange}
						name='wage'
						label='Wage'
						placeholder='Enter Starting Wage'
					/>
					<button
						id='addEmployee'
						type='submit'
					>
						Add Employee
					</button>
				</form>
				<button
					id='closeButton'
					onClick={() => setAddPopUp(false)}
				>
					Close
				</button>
			</div>
		</div>
	) : (
		''
	);
};

export const FindPopUp = ({ findPopUp, setFindPopUp }) => {
	return findPopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Find Employee</h4>
				<button
					id='closeButton'
					onClick={() => setFindPopUp(false)}
				>
					Close
				</button>
			</div>
		</div>
	) : (
		''
	);
};

export const UpdatePopUp = ({ updatePopUp, setUpdatePopUp }) => {
	return updatePopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Update Employee's Info</h4>
				<button
					id='closeButton'
					onClick={() => setUpdatePopUp(false)}
				>
					Close
				</button>
			</div>
		</div>
	) : (
		''
	);
};

export const DeletePopUp = ({ deletePopUp, setDeletePopUp }) => {


	return deletePopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Delete Employee's Data</h4>
				<button
					id='closeButton'
					onClick={() => setDeletePopUp(false)}
				>
					Close
				</button>
			</div>
		</div>
	) : (
		''
	);
};

export const CalcPopUp = ({ calcPopUp, setCalcPopUp }) => {
	return calcPopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Calculator</h4>
				<button
					id='closeButton'
					onClick={() => setCalcPopUp(false)}
				>
					Close
				</button>
			</div>
		</div>
	) : (
		''
	);
};
