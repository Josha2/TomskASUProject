import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import deleteImg from '../img/delete.png';
import editImg from '../img/edit.png';
import {fetchPersons} from '../redux/actions/actions';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';

function PersonsTable({personsList, fetchPersons}) {

  useEffect(() => {
    setTimeout(() => {
      fetchPersons();
    }, 1000);
  }, [fetchPersons]);

  //рендер тела таблицы
  const tableContent = personsList.map((item) => {
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

  const test = () => {
    return (
      <tr>
        <td colSpan={4} className="info-td">
          <ErrorMessage/>
        </td>
      </tr>
    );
  };

  const tableData = personsList.length !== 0 ? tableContent : test();

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
        {tableData}
      </tbody>
      </table>
      <button className="btn">
        Add Employee
      </button>
    </>
  );
};

const mapStateToProps = ({personsList}) => {
  return {
    personsList
  };
};

const mapDispatchToProps = {
  fetchPersons
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(PersonsTable));
