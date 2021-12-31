import { combineReducers } from "redux";
import { gameReducer } from "./gameReducer";
import { appReducer } from "./appReducer";

export default combineReducers({ game: gameReducer, app: appReducer });

export const getAppData = (state) => {
  return state.app;
};

export const getGameData = (state) => {
  return state.game;
};
