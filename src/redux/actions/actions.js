const fetchPersons = () => {
  return async (dispatch) => {
    const responce = await fetch("http://localhost:8080/persons");
    const body = await responce.json();
    dispatch({
      type: "FETCH_PERSONS",
      payload: body
    });
  };
};

export {
  fetchPersons
};

