const db = require('../models/employeeModels');

const employeeController = {};

employeeController.getEmployee = async (req, res, next) => {
  const employeeQuery = 'SELECT * FROM people';

  try {
    
    return next();
  } catch(err) {
    return next({
      log: 'An error occured at getEmployee middleware' + JSON.stringify(err),
      status: 500,
      message: {err: 'An Error Occurred while retrieving employee\'s information'}
    });
  }
}

module.exports = employeeController;