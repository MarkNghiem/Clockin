import * as types from '../constants/employeeActionTypes';

export const addEmployee = data => ({
  type: types.ADD_EMPLOYEE,
  payload: {
    _id: data._id,
    name: data.name,
    title: data.title,
    status: data.status,
    wage: data.wage,
    total_hrs: data.total_hrs,
    company: data.company
  }
});

export const findEmployee = data => ({
  type: types.FIND_EMPLOYEE,
  payload: data
});

export const updateEmployee = data => ({
  type: types.UPDATE_EMPLOYEE,
  payload: data
});

export const deleteEmployee = id => ({
  type: types.DELETE_EMPLOYEE,
  payload: id
})