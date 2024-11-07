import React, { useState } from 'react';
import * as actions from '../actions/employeeActions';
import { useDispatch, useSelector } from 'react-redux';

export const AddPopUp = ({ addPopUp, setAddPopUp }) => {
	const dispatch = useDispatch();
	const name = useSelector((state) => state.employee.name);
  console.log(name);

	const handleChange = (event) => {
		console.log('handleChange Event: ', event);
		dispatch(actions.updateEmployee(event.target.value));
	};
	const handleAdd = (event) => {
		console.log('handleAdd event: ', event);
		event.preventDefault();
		console.log(name);
		dispatch(actions.addEmployee(name));
	};

	return addPopUp ? (
		<div id='AddContainer'>
			<div id='AddDisplay'>
				<h4>Add New Employee</h4>
				<form onSubmit={handleAdd}>
					<label htmlFor='addEmployee'>Add New Employee</label>
					<input
            onChange={handleChange}
						value={name}
            name='addEmployee'
            type='text'
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
		' '
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
