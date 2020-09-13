import React, { memo, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { clearNotification } from '../redux/actions/actions';

function Notification({errorText, hasError, clearNotification, successText, hasSuccess}) {
  useEffect(() => {
    setTimeout(() => {
      clearNotification();
    }, 2000);
  });
  
  return (
    <CSSTransition
      in={hasError || hasSuccess}
      classNames={classnames({
        "success-notification": hasSuccess,
        "error-notification": hasError
      })}
      timeout={{
        enter: 300,
        exit: 300
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={classnames({
          "success-notification": hasSuccess,
          "error-notification": hasError
        })}
      >
        <p>{errorText || successText}</p>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({successText, errorText, hasError, hasSuccess}) => {
  return {
    successText,
    hasSuccess,
    errorText,
    hasError
  };
};

const mapDispatchToProps = {
  clearNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Notification));
