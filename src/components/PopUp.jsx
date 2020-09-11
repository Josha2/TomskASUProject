import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addNewPerson } from '../redux/actions/actions';

function PopUp({isOpen, header, setIsModalOpen, addNewPerson}) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  
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
            onClick={() => addNewPerson(firstName, secondName)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addNewPerson
};

export default connect(null, mapDispatchToProps)(PopUp);
