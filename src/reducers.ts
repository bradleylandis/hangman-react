import { combineReducers } from "redux";
import gameReducer, * as fromGame from "./gameReducer";
import appReducer, * as fromApp from "./appReducer";
import type { GameState } from "./gameReducer";
import type { AppState } from "./appReducer";

export interface GlobalState {
  game: GameState;
  app: AppState;
}

export default combineReducers({ game: gameReducer, app: appReducer });

export const getIsLoading = (state: GlobalState) =>
  fromApp.getIsLoading(state.app);
export const getIsError = (state: GlobalState) => fromApp.getIsError(state.app);

export const getDifficultySettings = (state: GlobalState) =>
  fromGame.getDifficultySettings(state.game);
export const getWord = (state: GlobalState) => fromGame.getWord(state.game);
export const getFinished = (state: GlobalState) =>
  fromGame.getFinished(state.game);
export const getLost = (state: GlobalState) => fromGame.getLost(state.game);
export const getCorrectGuesses = (state: GlobalState) =>
  fromGame.getCorrectGuesses(state.game);
export const getIncorrectGuesses = (state: GlobalState) =>
  fromGame.getIncorrectGuesses(state.game);
export const getId = (state: GlobalState) => fromGame.getId(state.game);

export const getCurrentWord = (state: GlobalState) =>
  fromGame.getCurrentWord(state.game);
