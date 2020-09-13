import axios from 'axios';
import {urlLoad} from '../../url/url';

const fetchPersons = () => {
  return (dispatch) => {
    axios
      .get(urlLoad)
      .then(responce => {
        dispatch({
          type: "FETCH_PERSONS",
          payload: responce.data
        });
      })
      .catch(error => {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message
        });
      });
    };
};

const changePersons = (persons) => {
  return {
    type: "CHANGE_PERSONS",
    payload: persons
  };
};

const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const catchError = (error) => {
  return {
    type: "CATCH_ERROR",
    payload: error.message
  }
};

const catchSuccess = (success) => {
  return {
    type: "CATCH_SUCCESS",
    payload: success
  }
};

export {
  fetchPersons,
  catchError,
  catchSuccess,
  clearNotification,
  changePersons
};

