import { fetchWord } from "./api";
import { getDifficultySettings } from "./reducers";

export const applyGuess = (letter) => {
  return {
    type: "APPLY_GUESS",
    letter: letter,
  };
};

export const setWord = (word) => {
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

export const startGame = () => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const word = await fetchWord(getDifficultySettings(getState()));
    dispatch(setWord(word));
  } catch (e) {
    console.error(e);
    dispatch(setError());
  }
};

export const updateDifficulty = (data) => {
  return {
    type: "SET_DIFFICULTY",
    difficultySettings: data,
  };
};
