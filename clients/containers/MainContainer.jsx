import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEmployee } from '../reducers/employeeReducer.js';
import AdminDisplay from '../components/AdminDisplay.jsx';
import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import InfoDisplay from '../components/InfoDisplay.jsx';
import StatusDisplay from '../components/StatusDisplay.jsx';
import PeriodDisplay from '../components/PeriodDisplay.jsx';
import DetailContainer from './DetailContainer.jsx';
import {
	AddPopUp,
	FindPopUp,
	UpdatePopUp,
	DeletePopUp,
	CalcPopUp,
} from '../components/PopUps.jsx';

const MainContainer = () => {
	const [addPopUp, setAddPopUp] = useState(false);
	const [findPopUp, setFindPopUp] = useState(false);
	const [updatePopUp, setUpdatePopUp] = useState(false);
	const [deletePopUp, setDeletePopUp] = useState(false);
	const [calcPopUp, setCalcPopUp] = useState(false);

	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employee);
	useEffect(() => {
		dispatch(fetchEmployee());
	}, []);
	console.log(employees);

	const name = [];
	employees.data.map((person) => name.push(person.name));

	const id = [];
	employees.data.map((person) => id.push(person._id));

	const company = [];
	employees.data.map((person) => company.push(person.company));

	const title = [];
	employees.data.map((person) => title.push(person.title));

	const status = [];
	employees.data.map((person) => status.push(person.status));

	const wage = [];
	employees.data.map((person) => wage.push(person.wage));

	const total_hrs = [];
	employees.data.map((person) => total_hrs.push(person.total_hrs));

	const period = '11/01/2024 - 11/14/2024';

	return (
		<div id='isLoading'>
			{employees.isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div id='mainContainer'>
					<AdminDisplay
						setAddPopUp={setAddPopUp}
						setFindPopUp={setFindPopUp}
						setUpdatePopUp={setUpdatePopUp}
						setDeletePopUp={setDeletePopUp}
						setCalcPopUp={setCalcPopUp}
					/>
					<WelcomeDisplay name={name[0]} />
					<InfoDisplay
						name={name[0]}
						employeeId={id[0]}
						company={company[0]}
						title={title[0]}
					/>
					<StatusDisplay
						employeeStatus={status[0]}
						wage={wage[0]}
					/>
					<PeriodDisplay
						currentPeriod={period}
						totalHrs={total_hrs[0]}
					/>
					<DetailContainer
						company={company[0]}
						employees={employees.data}
					/>
					<AddPopUp
						addPopUp={addPopUp}
						setAddPopUp={setAddPopUp}
					/>
					<FindPopUp
						findPopUp={findPopUp}
						setFindPopUp={setFindPopUp}
					/>
					<UpdatePopUp
						updatePopUp={updatePopUp}
						setUpdatePopUp={setUpdatePopUp}
					/>
					<DeletePopUp
						deletePopUp={deletePopUp}
						setDeletePopUp={setDeletePopUp}
					/>
					<CalcPopUp
						calcPopUp={calcPopUp}
						setCalcPopUp={setCalcPopUp}
					/>
				</div>
			)}
		</div>
	);
};

export default MainContainer;
