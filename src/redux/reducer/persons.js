const initialState = {
  personsList: [],
  isLoading: true,
  hasError: false
};

const personsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PERSONS":
      return {
        ...state,
        personsList: action.payload,
        isLoading: false,
      };
    default:
      return state;
  };
};


export default personsReducer;