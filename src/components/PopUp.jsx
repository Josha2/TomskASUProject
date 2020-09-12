import React, { memo, useState } from 'react';

function PopUp({isOpen, header, setIsModalOpen, inpuFields, id, handleOkClick}) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  
  function onOkClick(){
    if(inpuFields)
      handleOkClick(firstName, secondName);
    else 
      handleOkClick(id)
  };

  function popUpBody() {
    if(inpuFields){
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
    else {
      return <span>Are you sure you want to delete this person?</span>
    }
  };
  
  return (
    <div
      className="overlay" 
      style={{"display" : isOpen ? "block" : "none"}}
    >
      <div
        className="popup"
        style={{"display" : isOpen ? "block" : "none"}}
      >
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
  );
};

export default memo(PopUp);
