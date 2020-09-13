const initialState = {
  personsList: [],
  isLoading: true,
  fetchError: false,
  hasError: false,
  hasSuccess: false,
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
    case "CHANGE_PERSONS": 
      return {
        ...state,
        personsList: action.payload
      };
    case "FETCH_ERROR":
      return {
        ...state,
        fetchError: true,
        errorText: action.payload,
      };
    case "CATCH_SUCCESS":
      return {
        ...state,
        hasSuccess: true,
        successText: action.payload
      };
    case "CATCH_ERROR":
      return {
        ...state,
        hasError: true,
        errorText: action.payload
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        successText: null,
        errorText: null,
        hasError: false,
        hasSuccess: false
      };
    default:
      return state;
  };
};


export default personsReducer;