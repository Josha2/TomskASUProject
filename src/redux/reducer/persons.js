const initialState = {
  personsList: [],
  isLoading: true,
  hasError: false,
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
    case "ADD_NEW_PERSON":
      return state
    case "FETCH_SUCCESS":
      return {
        ...state,
        successText: action.payload
      };
    case "FETCH_ERROR":
      return {
        ...state,
        hasError: true,
        errorText: action.payload
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        hasError: false
      };
    default:
      return state;
  };
};


export default personsReducer;