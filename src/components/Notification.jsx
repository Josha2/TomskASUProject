import React from 'react'
import classNames from 'classnames';

function Notification({error, success, text}) {
  return (
    <div 
      className={classNames({
        'success-message': success,
        'error-message': error
      })}
    >
      <p>{text}</p>
    </div>
  );
};

export default Notification;
