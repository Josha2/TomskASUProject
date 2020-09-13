import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changePersons, catchSuccess, catchError } from '../redux/actions/actions';
import {urlAction} from '../url/url';
import axios from 'axios';
import newUser from '../img/newUser.png';

function PopUp({isOpen, header, setIsModalOpen, inputFields, user, handleInputChange, changePersons, personsList, catchError, catchSuccess}) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  function onOkClick(){
    if(user === undefined){
      axios
        .post(urlAction, {
          firstName: firstName === "" ? "New guy" : firstName,
          secondName: secondName === "" ? "New guy" : secondName,
          avatar: newUser
        })
        .then(responce => {
          catchSuccess("Person successfully added!");
          changePersons(personsList.concat(responce.data));
          setIsModalOpen(false);
        })
        .catch(error => {
          catchError(error);
        });
    }
    else if (user && inputFields){
      axios
        .put(`${urlAction}/${user.id}`, {
          firstName: user.firstName,
          secondName: user.secondName,
          avatar: user.avatar
        })
        .then(responce => {
          catchSuccess("Data successfully changed!");
          changePersons(personsList.map(person => 
            person.id !== user.id ? person : responce.data
          ));
          setIsModalOpen(false);
        })
        .catch(error => {
          catchError(error);
        });
    }
    else if (!inputFields){
      axios
        .delete(`${urlAction}/${user.id}`)
        .then(() => {
          catchSuccess("Person successfully deleted!");
          changePersons(personsList.filter(person => 
            person.id !== user.id
          ));
          setIsModalOpen(false);
        })
        .catch(error => {
          catchError(error);
        });
    }
  };

  function popUpBody(){
    if(user === undefined){
      return (
        <>
        <input 
          type="text" 
          placeholder="Enter first name" 
          className="popup-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter second name" 
          className="popup-input"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        </>
      );
    }
    else if (user && inputFields) {
      return (
        <>
        <input 
          type="text" 
          placeholder="Enter first name" 
          className="popup-input"
          value={user.firstName}
          onChange={(e) => {
            const newUser = {...user};
            handleInputChange({...newUser, firstName: e.target.value});
          }}
        />
        <input 
          type="text" 
          placeholder="Enter second name" 
          className="popup-input"
          value={user.secondName}
          onChange={(e) => {
            const newUser = {...user};
            handleInputChange({...newUser, secondName: e.target.value});
          }}
        />
        </>
      );
    }
    else if (!inputFields) {
      return <span>Are you sure you want to delete this person?</span>
    }
  };
  
  return (
    <CSSTransition
      in={isOpen}
      classNames={"overlay"}
      timeout={{
        enter: 300,
        exit: 300
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className="overlay">
        <div className="popup">
          <div className="popup-header">
            <h4>{header}</h4>
          </div>
          <div className="popup-body">
            {popUpBody()}
          </div>
          <div className="popup-footer">
            <button 
              className="btn btn-popup"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button 
              className="btn btn-popup"
              onClick={onOkClick}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({personsList}) => {
  return {
    personsList,
  };
};

const mapDispatchToProps = {
  changePersons,
  catchSuccess,
  catchError
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(PopUp));
