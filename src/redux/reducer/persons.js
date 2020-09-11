const initialState = {
  personsList: [],
  isLoading: true,
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
        errorText: action.payload
      };
    default:
      return state;
  };
};


export default personsReducer;