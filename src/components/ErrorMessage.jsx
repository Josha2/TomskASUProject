import React from 'react'
import errorImg from '../img/error.jpg'

function ErrorMessage() {
  return (
    <div className="error-table-message">
      <span>OOPS! <br/>Seems like data hasn't been loaded. Try to refresh page</span>
      <img src={errorImg} alt="error"/>
    </div>
  );
};

export default ErrorMessage
