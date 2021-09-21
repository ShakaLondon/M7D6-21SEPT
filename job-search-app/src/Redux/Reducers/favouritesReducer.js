import initialState from '../initialState';

const favouritesReducer = (state = initialState.favourites, action) => {
  switch (action.type) {
    case "ADD_TO_FAV" : 
    return {
      ...state,
      jobs: [
        ...state.jobs,
        action.payload
      ]
    }
    case "REMOVE_FROM_FAV" :
      return {
        ...state,
        jobs: 
          state.jobs.filter(
            (l) => l._id !== action.payload._id 
          )
        // Replacing state as an Array from filter
      }
    default:
      return state;
  }
};

export default favouritesReducer;

