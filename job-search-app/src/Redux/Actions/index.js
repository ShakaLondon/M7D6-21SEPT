

export const fetchResultsAction = (query, searchType) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "LOADING",
        payload: true,
      });

      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}${searchType}=${query}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGIwZGZiYmRjMTQ1ODAwMTVlNGFlZTUiLCJpYXQiOjE2MzE3NzI3MTIsImV4cCI6MTYzMjk4MjMxMn0.2YWhQrKLUrKnO_spK_yPMr-orqdslBjHVr-zMEUyYPk",
          },
        }
      );
      if (response.ok) {
        const fetched = await response.json();
        const fetchedContent = fetched.data;
        switch (searchType) {
          case "search":
            dispatch({
              type: "JOB_SEARCH",
              payload: fetchedContent,
            });
            break;
          case "company":
            dispatch({
              type: "COMPANY_JOBS",
              payload: fetchedContent,
            });
            break;
          case "limit=10&":
            dispatch({
              type: "ALL_JOBS",
              payload: fetchedContent,
            });
            break;

        //   default:
        //     dispatch({
        //       type: FILL_SEARCH,
        //       payload: fetchedContent,
        //     });
        //     break;
        }

        dispatch({
          type: "ERROR",
          payload: false,
        });
        dispatch({
          type: "LOADING",
          payload: false,
        });
      } else {
        dispatch({
          type: "ERROR",
          payload: true,
        });
        dispatch({
          type: "LOADING",
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: true,
      });
      dispatch({
        type: "LOADING",
        payload: false,
      });
    }
  };
};

export const addToFavAction = (query) => ({
  type: "ADD_TO_FAV",
  payload: query,
});

export const removeFromFavAction = (query) => ({
  type: "REMOVE_FROM_FAV",
  payload: query,
});

export const setUsernameAction = (name) => ({
  type: 'SET_USERNAME',
  payload: name,
})