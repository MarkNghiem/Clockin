const db = require('../models/employeeModels');

const employeeController = {};

employeeController.getEmployee = async (_req, res, next) => {
	// Getting all info in people table
	const employeeQuery = 'SELECT * FROM people;';

	try {
		const employeeData = await db.query(employeeQuery);
		// console.log(employeeData.rows);
		res.locals.employeeData = employeeData.rows;
		return next();
	} catch (err) {
		return next({
			log:
				'An error occured in getEmployee middleware' +
				JSON.stringify(err),
			status: 500,
			message: {
				err: "An Error Occurred while retrieving employee's information",
			},
		});
	}
};

employeeController.addEmployee = async (req, res, next) => {
	const { name, title, status, wage, total_hrs, company } = req.body;

	const addQuery = `
        INSERT INTO people (name, title, status, wage, total_hrs, company)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`; // Use RETURNING to get the inserted row back

	const values = [name, title, status, wage, total_hrs, company]; // Parameterized values

	try {
		const newEmployeeData = await db.query(addQuery, values);
		res.locals.newEmployeeData = newEmployeeData.rows[0];
		return next();
	} catch (err) {
		return next({
			log:
				'An error occurred in addEmployee middleware: ' +
				JSON.stringify(err),
			status: 500,
			message: {
				err: "An error occurred on the server while adding new employee's info",
			},
		});
	}
};

// employeeController.findEmployee = async (req, res, next) => {
// 	const { id } = req.query;
// 	const findQuery = `
//   SELECT * FROM people
//   WHERE _id = $1;
//   `;
// 	const values = [id];

// 	try {
//     const foundEmployeeData = await db.query(findQuery, values);
//     res.locals.foundEmployeeData = foundEmployeeData;
//     console.log(foundEmployeeData)
// 		return next();
// 	} catch (err) {
// 		return next({
// 			log:
// 				'An error occurred in findEmployee middleware: ' +
// 				JSON.stringify(err),
// 			status: 500,
// 			message: {
// 				err: "An error occurred on the server while finding employee's info",
// 			},
// 		});
// 	}
// };

module.exports = employeeController;
