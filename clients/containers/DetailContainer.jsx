import React from 'react';
import { useSelector } from 'react-redux';

import OrgDisplay from '../components/OrgDisplay.jsx';
import EmployeeDisplay from '../components/EmployeeDisplay.jsx';

const DetailContainer = ({ company, employees}) => {
  return (
    <div id='detailContainer'>
      <OrgDisplay 
        company={company}
      />
      <EmployeeDisplay 
        employees={employees}
      />
    </div>
  )
}

export default DetailContainer;