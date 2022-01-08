import * as api from "./api";
import { getDifficultySettings } from "./reducers";
import type { Dispatch } from "redux";
import type { GlobalState } from "./reducers";
import { DifficultySettings } from "./gameReducer";

export interface ApplyGuessAction {
  type: "APPLY_GUESS";
  letter: string;
}

export const applyGuess = (letter: string): ApplyGuessAction => ({
  type: "APPLY_GUESS",
  letter: letter,
});

export interface SetWordAction {
  type: "SET_WORD";
  word: string;
  id: string;
}

export const setWord = (word: string, id: string): SetWordAction => {
  return {
    type: "SET_WORD",
    word: word,
    id: id,
  };
};

export const setError = () => {
  return {
    type: "SET_ERROR",
  };
};

export const startLoading = () => {
  return {
    type: "START_LOADING",
  };
};

export const startGame =
  () => async (dispatch: Dispatch, getState: () => GlobalState) => {
    dispatch(startLoading());
    try {
      const { currentWord, id } = await api.startGame(
        getDifficultySettings(getState())
      );
      dispatch(setWord(currentWord, id));
    } catch (e) {
      console.error(e);
      dispatch(setError());
    }
  };

export interface SetDifficultyAction {
  type: "SET_DIFFICULTY";
  difficultySettings: DifficultySettings;
}

export const updateDifficulty = (
  data: DifficultySettings
): SetDifficultyAction => {
  return {
    type: "SET_DIFFICULTY",
    difficultySettings: data,
  };
};
