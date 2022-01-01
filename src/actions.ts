import { fetchWord } from "./api";
import { getDifficultySettings } from "./reducers";
import type { Dispatch } from "redux";
import type {GlobalState} from './reducers';

export interface ApplyGuessAction {
  type: "APPLY_GUESS",
  letter: string
}

export const applyGuess = (letter: string): ApplyGuessAction => ({
  type: "APPLY_GUESS",
  letter: letter,
});

export const setWord = (word: string) => {
  return {
    type: "SET_WORD",
    word: word,
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

export const startGame = () => async (dispatch: Dispatch, getState: () => GlobalState) => {
  dispatch(startLoading());
  try {
    const word = await fetchWord(getDifficultySettings(getState()));
    dispatch(setWord(word));
  } catch (e) {
    console.error(e);
    dispatch(setError());
  }
};

export const updateDifficulty = (data: {}) => {
  return {
    type: "SET_DIFFICULTY",
    difficultySettings: data,
  };
};
