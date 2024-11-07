const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');
// router.get('/employee/:id', (req, res) => {
//   res.status(200).json(res.locals.foundEmployeeData);
// })

router.get('/', employeeController.getEmployee, (_req, res) => {
  res.status(200).json(res.locals.employeeData);
});

router.post('/employee', employeeController.addEmployee, (req, res) => {
  res.status(200).json(`Successfully Added ${res.locals.newEmployeeData.name} into the System`);
});

module.exports = router;