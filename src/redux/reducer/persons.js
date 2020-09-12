const initialState = {
  personsList: [],
  isLoading: true,
  fetchError: false,
  catchError: false,
  errorText: null,
  successText: null,
};

const personsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PERSONS":
      return {
        ...state,
        personsList: action.payload,
        isLoading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        fetchError: true,
        errorText: action.payload,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        successText: action.payload
      };
    case "CATCH_ERROR":
      return {
        ...state,
        catchError: true,
        errorText: action.payload
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        catchError: false
      };
    default:
      return state;
  };
};


export default personsReducer;