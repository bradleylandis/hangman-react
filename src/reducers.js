import { combineReducers } from "redux";
import gameReducer, * as fromGame from "./gameReducer";
import appReducer, * as fromApp from "./appReducer";

export default combineReducers({ game: gameReducer, app: appReducer });

export const getIsLoading = (state) => fromApp.getIsLoading(state.app);
export const getIsError = (state) => fromApp.getIsError(state.app);

export const getDifficultySettings = (state) =>
  fromGame.getDifficultySettings(state.game);
export const getWord = (state) => fromGame.getWord(state.game);
export const getFinished = (state) => fromGame.getFinished(state.game);
export const getLost = (state) => fromGame.getLost(state.game);
export const getCorrectGuesses = (state) =>
  fromGame.getCorrectGuesses(state.game);
export const getIncorrectGuesses = (state) =>
  fromGame.getIncorrectGuesses(state.game);
