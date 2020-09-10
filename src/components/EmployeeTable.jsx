import React from 'react';
import editImg from '../img/edit.png';
import deleteImg from '../img/delete.png';

function EmployeeTable({persons}) {

  //рендер тела таблицы
  const tableContent = persons.map((item) => {
    const {id, avatar, firstName, secondName} = item;
    return (
      <tr key={id}>
        <td><img src={avatar} alt="profile-pic"/></td>
        <td data-label="First Name">{firstName}</td>
        <td data-label="Second Name">{secondName}</td>
        <td data-label="Action">
          <img src={editImg} alt="edit"/>
          <img src={deleteImg} alt="delete"/>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table">
      <thead>
        <tr>
          <th className="th-avatar"></th>
          <th className="th-first-name">First name</th>
          <th className="th-second-name">Second name</th>
          <th className="th-action">Action</th>
        </tr>
      </thead>
      <tbody>
        {tableContent}
      </tbody>
      </table>
      <button className="btn">
        Add Employee
      </button>
    </>
  )
}

export default EmployeeTable
