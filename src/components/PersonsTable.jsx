import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPersons } from '../redux/actions/actions';
import PopUp from '../components/PopUp';
import Spinner from '../components/Spinner';
import ErrorMessage from './ErrorMessage';
import Notification from './Notification';
import Pagination from './Pagination';
import deleteImg from '../img/delete.png';
import editImg from '../img/edit.png';

function PersonsTable({personsList, fetchPersons, isLoading, fetchError}) {
  //состояние управления пагинацией
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(7);

  //состояния для открытия попап окон
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({id: null, firstName: "", secondName: "", avatar: null});

  useEffect(() => {
    setTimeout(() => {
      fetchPersons();
    }, 500);
  }, [fetchPersons]);

  //вычленяем из массива personsList те n(7) элементов которые в данный момент отобр. на странице
  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const personsGroup = personsList.slice(indexOfFirstItem, indexOfLastItem);
  
  //рендер тела таблицы
  const tableData = personsGroup.map((item) => {
    const {id, avatar, firstName, secondName} = item;
    return (
      <tr key={id}>
        <td><img src={avatar} alt="profile-pic"/></td>
        <td data-label="First Name">{firstName}</td>
        <td data-label="Second Name">{secondName}</td>
        <td data-label="Action">
          <img 
            src={editImg} 
            alt="edit"
            onClick={() => {
              setCurrentUser({id, firstName, secondName, avatar});
              setIsEditModalOpen(true)
            }}
          />
          <img 
            src={deleteImg} 
            alt="delete"
            onClick={() => {
              setCurrentUser({...currentUser, id});
              setIsDeleteModalOpen(true);
            }}
          />
        </td>
      </tr>
    );
  });

  //логика отображения спиннера/ошибки
  function showErrorOrSpinner() {
    return (
      <tr>
        <td colSpan={4} className="info-td"> 
          {isLoading && !fetchError ? <Spinner/> : null}
          {fetchError ? <ErrorMessage/> : null}
        </td>
      </tr>
    );
  };

  return (
    <>
      <Notification/>
      <PopUp 
        header="New person"
        isOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        inputFields
      />
      <PopUp 
        header="Edit person"
        isOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleInputChange={setCurrentUser}
        user={currentUser}
        inputFields
      />
      <PopUp 
        header="Delete person"
        isOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        user={currentUser}
        inputFields={false}
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
          {!(isLoading || fetchError) ? tableData : showErrorOrSpinner()}
        </tbody>
      </table>
      <div className="table-footer">
        <button 
          className="btn"
          disabled={isLoading}
          onClick={() => setIsAddModalOpen(true)}
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

const mapStateToProps = ({personsList, isLoading, fetchError}) => {
  return {
    personsList,
    isLoading,
    fetchError
  };
};

const mapDispatchToProps = {
  fetchPersons,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(PersonsTable));
