import * as types from '../constants/employeeActionTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = 'http://localhost:3000';

export const fetchEmployee = createAsyncThunk('fetchEmployee', async () => {
	try {
		const response = await fetch(SERVER_URL + '/api')
		const data = await response.json();
		return data;
	} catch(err) {
		console.error(`Error Occurred while fetching data: ${err}`);
		alert('Unable to retrieve data from the server');
	}
});

const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		isLoading: false,
		data: [],
		error: false
	},

	reducers: {
		addEmployee(state, action) {
			state.data.push(action.payload)
		},

		findEmployee(state, action) {
			return state.data[action.payload]
		}


	},

	extraReducers: (builder) => {
		builder.addCase(fetchEmployee.pending, (state, action) => {
			state.isLoading = true
		})

		builder.addCase(fetchEmployee.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload
		})

		builder.addCase(fetchEmployee.rejected, (state, action) => {
			state.error = true;
		})
	}
});

export const { addEmployee } = employeeSlice.actions 
export default employeeSlice.reducer;