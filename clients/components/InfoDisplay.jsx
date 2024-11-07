import React from 'react';

const InfoDisplay = ({ name, employeeId, company, title }) => {
  return (
    <div id='infoDisplay'>
      <ul id='infoDisplayList'>
        <li id='infoDisplayListitem'>
          <strong>Name: </strong>
          {name}
        </li>
        <li id='infoDisplayListitem'>
          <strong>ID: </strong>
          {employeeId}
        </li>
        <li id='infoDisplayListitem'>
          <strong>Company: </strong>
          {company}
        </li>
        <li id='infoDisplayListitem'>
          <strong>Title: </strong>
          {title}
        </li>
      </ul>
    </div>
    )
}

export default InfoDisplay