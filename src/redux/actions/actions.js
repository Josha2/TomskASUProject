import axios from 'axios';
import newUser from '../../img/newUser.png';

const url = "http://localhost:8080/persons";

const fetchPersons = () => {
  return async (dispatch) => {
    await axios.get(url)
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

const addNewPerson = (firstName, secondName) => {
  return async (dispatch) => {
    await axios.post(`${url}h`, {
      firstName,
      secondName,
      avatar: newUser
    })
    .catch(error => {
      dispatch({
        type: "CATCH_ERROR",
        payload: error.message
      });
    });
  };
};

const deletePerson = (id) => {
  return async (dispatch) => {
    await axios.delete(`${url}/${id}`)
    .catch(error => {
      dispatch({
        type: "CATCH_ERROR",
        payload: error.message
      });
    });
  };
};

const editPerson = (id, firstName, secondName, avatar) => {
  return async (dispatch) => {
    await axios.put(`${url}/${id}`, {
      firstName,
      secondName,
      avatar
    })
    .catch(error => {
      dispatch({
        type: "CATCH_ERROR",
        payload: error.message
      });
    });
  };
};

const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
};

export {
  fetchPersons,
  addNewPerson,
  editPerson,
  deletePerson,
  clearError
};

