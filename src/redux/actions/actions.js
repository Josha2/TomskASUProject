import axios from 'axios';
import newUser from '../../img/newUser.png';

const url = "http://localhost:8080/persons";

const fetchPersons = () => {
  return async (dispatch) => {
    const responce = await axios.get(url);
    dispatch({
      type: "FETCH_PERSONS",
      payload: responce.data
    });
  };
};

const addNewPerson = (firstName, secondName) => {
  return async (dispatch) => {
    await axios.post(`${url}`, {
      firstName,
      secondName,
      avatar: newUser
    })
    .then(responce => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: responce
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

const deletePerson = (id) => {
  return async (dispatch) => {
    await axios.delete(`${url}/${id}`)
    .catch(error => {
      dispatch({
        type: "FETCH_ERROR",
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
  clearError,
  deletePerson
};

