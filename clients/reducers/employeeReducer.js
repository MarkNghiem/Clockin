import * as types from '../constants/employeeActionTypes';

const employee = {
  employeeId: 0,
  name: '',
  company: '',
  title: '',
  employeeStatus: '',
  wage: 0,
  currentPeriod: '11/01/2024 - 11/14/2024',
  totalHrs: 0
}

const employeeReducer = (state = employee, action) => {
  switch (action.type) {
    case types.ADD_EMPLOYEE:
      return {
			...state,
			// employeeId: action.payload.id,
			name: action.payload,
			// company: action.payload.company,
			// title: action.payload.title,
			// employeeStatus: action.payload.status,
			// wage: action.payload.wage,
			// currentPeriod: action.payload.period,
			// totalHrs: action.payload.totalHrs,
		};

    case types.FIND_EMPLOYEE:
      return {
			...state,
			employeeId: action.payload.id,
			name: action.payload.name,
			company: action.payload.company,
			title: action.payload.title,
			employeeStatus: action.payload.status,
			wage: action.payload.wage,
			totalHrs: action.payload.totalHrs,
		};

    case types.UPDATE_EMPLOYEE:
      return {
			...state,
			name: action.payload,
		};

    case types.DELETE_EMPLOYEE:
      return {
			...state,
			employeeId: action.payload.id,
			name: action.payload.name,
			company: action.payload.company,
			title: action.payload.title,
			employeeStatus: action.payload.status,
			wage: action.payload.wage,
			totalHrs: action.payload.totalHrs,
		};

    default:
      return state;
  }
};

export default employeeReducer;