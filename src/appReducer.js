const appReducer = (state = { isLoading: true, isError: false }, action) => {
  switch (action.type) {
    case "SET_WORD":
      return {
        isLoading: false,
        isError: false,
      };
    case "START_LOADING":
      return {
        isLoading: true,
        isError: false,
      };
    case "SET_ERROR":
      return {
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default appReducer;

export const getIsLoading = (state) => state.isLoading;
export const getIsError = (state) => state.isError;
