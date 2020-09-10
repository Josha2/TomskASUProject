import React from 'react';

function PopUp() {
  
  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup-header">
          <h4>Edit employee</h4>
        </div>
        <div className="popup-body">
          <input 
            type="text" 
            placeholder="Enter first name" 
            className="popup-input"
          />
          <input 
            type="text" 
            placeholder="Enter second name" 
            className="popup-input"
          />
        </div>
        <div className="popup-footer">
          <button className="btn btn-popup">
            Close
          </button>
          <button className="btn btn-popup">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
