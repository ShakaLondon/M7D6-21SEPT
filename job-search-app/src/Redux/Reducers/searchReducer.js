
  import initialState from '../initialState';

  
  const searchReducer = (state = initialState.search, action) => {
    switch (action.type) {
      case "JOB_SEARCH":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "COMPANY_JOBS":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "ALL_JOBS":
        return {
          ...state,
          allJobs: action.payload,
        };
      case "ERROR":
        return {
          ...state,
          error: action.payload,
        };
      case "LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchReducer;