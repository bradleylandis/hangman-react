import { Action } from "redux";

export interface AppState {
  isLoading: boolean,
  isError: boolean
}

const initialAppState = {
  isLoading: true,
  isError: false
}

const appReducer = (state: AppState = initialAppState, action: Action) => {
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

export const getIsLoading = (state: AppState) => state.isLoading;
export const getIsError = (state: AppState) => state.isError;
