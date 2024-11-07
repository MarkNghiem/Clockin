import React from 'react';
import { useSelector } from 'react-redux';

import OrgDisplay from '../components/OrgDisplay.jsx';
import EmployeeDisplay from '../components/EmployeeDisplay.jsx';

const DetailContainer = ({ company, employeeId, name, title, wage }) => {
  return (
    <div id='detailContainer'>
      <OrgDisplay 
        company={company}
      />
      <EmployeeDisplay 
        employeeId={employeeId}
        name={name}
        title={title}
        wage={wage}
      />
    </div>
  )
}

export default DetailContainer;