import React, { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function PopUp({isOpen, header, setIsModalOpen, inputFields, user, handleOkClick, handleInputChange}) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  function onOkClick(){
    if(user === undefined)
      handleOkClick(firstName, secondName);
    else if (user && inputFields)
      handleOkClick(user.id, user.firstName, user.secondName, user.avatar);
    else if (!inputFields)
      handleOkClick(user.id);
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

export default memo(PopUp);
