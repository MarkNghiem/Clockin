import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AdminDisplay from '../components/AdminDisplay.jsx';
import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import InfoDisplay from '../components/InfoDisplay.jsx';
import StatusDisplay from '../components/StatusDisplay.jsx';
import PeriodDisplay from '../components/PeriodDisplay.jsx';
import DetailContainer from './DetailContainer.jsx';
import { AddPopUp, FindPopUp, UpdatePopUp, DeletePopUp, CalcPopUp } from '../components/PopUps.jsx';

const MainContainer = () => {
	const [addPopUp, setAddPopUp] = useState(false);
	const [findPopUp, setFindPopUp] = useState(false);
	const [updatePopUp, setUpdatePopUp] = useState(false);
	const [deletePopUp, setDeletePopUp] = useState(false);
	const [calcPopUp, setCalcPopUp] = useState(false);

	const name = useSelector((state) => state.employee.name);
	const employeeId = useSelector((state) => state.employee.employeeId);
	const company = useSelector((state) => state.employee.company);
	const title = useSelector((state) => state.employee.title);
	const employeeStatus = useSelector(
		(state) => state.employee.employeeStatus
	);
	const wage = useSelector((state) => state.employee.wage);
	const currentPeriod = useSelector((state) => state.employee.currentPeriod);
	const totalHrs = useSelector((state) => state.employee.totalHrs);

	return (
		<div>
			<AdminDisplay
				setAddPopUp={setAddPopUp}
				setFindPopUp={setFindPopUp}
				setUpdatePopUp={setUpdatePopUp}
				setDeletePopUp={setDeletePopUp}
				setCalcPopUp={setCalcPopUp}
			/>
			<WelcomeDisplay name={name} />
			<InfoDisplay
				name={name}
				employeeId={employeeId}
				company={company}
				title={title}
			/>
			<StatusDisplay
				employeeStatus={employeeStatus}
				wage={wage}
			/>
			<PeriodDisplay
				currentPeriod={currentPeriod}
				totalHrs={totalHrs}
			/>
			<DetailContainer
				company={company}
				employeeId={employeeId}
				name={name}
				title={title}
				wage={wage}
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
	);
};

export default MainContainer;
