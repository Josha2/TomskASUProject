import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {fetchPersons} from '../redux/actions/actions';
//import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import Pagination from './Pagination';
import PopUp from '../components/PopUp';
import deleteImg from '../img/delete.png';
import editImg from '../img/edit.png';

function PersonsTable({personsList, fetchPersons}) {
  //состояние управления пагинацией
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(7);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //получаем данные
  useEffect(() => {
    setTimeout(() => {
      fetchPersons();
    }, 500);
  }, [fetchPersons]);

  //рендер тела таблицы
  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const personsGroup = personsList.slice(indexOfFirstItem, indexOfLastItem);

  const tableContent = personsGroup.map((item) => {
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

  //логика отображения спиннера/ошибки
  function test() {
    return (
      <tr>
        <td colSpan={4} className="info-td">
          <Spinner/>
        </td>
      </tr>
    );
  };
  const tableData = personsList.length !== 0 ? tableContent : test();

  return (
    <>
      <PopUp 
        header="New person"
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
      <div className="table-footer">
        <button 
          className="btn"
          onClick={() => {setIsModalOpen(!isModalOpen)}}
        >
          Add Person
        </button>
        <Pagination
          dataPerPage={dataPerPage}
          totalPages={personsList.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          currentGroup={personsGroup}
        />
      </div>
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
