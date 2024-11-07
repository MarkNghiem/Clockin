import React, { useEffect } from 'react';



const EmployeeDisplay = ({ employees }) => {
  return (
    <div id='employeeDisplay'>
      <table id='employeesTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Wage</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(person => (
            <tr key={person._id}>
              <td>{person._id}</td>
              <td>{person.name}</td>
              <td>{person.title}</td>
              <td>{person.wage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeDisplay;