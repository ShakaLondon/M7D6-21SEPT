
  import initialState from '../initialState';

  
  const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
      case "SET_USERNAME" : 
      return {
        ...state,
        firstName: action.payload
      }
      case "REMOVE_USERNAME" :
        return {
          ...state,
          firstName: 
            state.firstName.filter(
              (l) => l._id !== action.payload._id 
            )
          // Replacing state as an Array from filter
        }
      default:
        return state;
    }
  };
  
  
  export default userReducer;