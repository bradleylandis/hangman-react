import { fetchWord } from "./api";

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
    const word = await fetchWord(getState().game.difficultySettings);
    dispatch(setWord(word));
  } catch {
    dispatch(setError());
  }
};

export const updateDifficulty = (data) => {
  return {
    type: "SET_DIFFICULTY",
    difficultySettings: data,
  };
};
