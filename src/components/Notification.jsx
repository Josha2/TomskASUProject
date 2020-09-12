import React, { memo } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { clearError } from '../redux/actions/actions';

function Notification({errorText, catchError, clearError}) {
  return (
    <CSSTransition
      in={catchError}
      classNames={"error-notification"}
      timeout={{
        enter: 300,
        exit: 500
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        onClick={clearError}
        className="error-notification"
      >
        <p>{errorText}</p>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({errorText, catchError}) => {
  return {
    errorText,
    catchError
  };
};

const mapDispatchToProps = {
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Notification));
