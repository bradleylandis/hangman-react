import type {ApplyGuessAction} from './actions'

const availablePartsOfSpeech = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "conjunction",
  "verb-transitive",
];
const selectedPartsOfSpeech = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "conjunction",
  "verb-transitive",
];

const defaultDifficultySettings = {
  minLength: 7,
  maxLength: 15,
  selectedPartsOfSpeech: selectedPartsOfSpeech,
  minCorpusCount: 1000000,
  maxCorpusCount: -1,
  minDictionaryCount: 1,
  maxDictionaryCount: -1,
};

const defaultState = {
  availablePartsOfSpeech: availablePartsOfSpeech,
  difficultySettings: defaultDifficultySettings,
  word: [],
  correctGuesses: [],
  incorrectGuesses: [],
  finished: false,
  lost: false,
};

interface SetDifficultyAction {
  type: "SET_DIFFICULTY",
  difficultySettings: {}
}

interface SetWordAction {
  type: "SET_WORD",
  word: string
}

type GameAction = SetDifficultyAction | SetWordAction | ApplyGuessAction;

export interface DifficultySettings {
  minLength: number,
  maxLength: number,
  selectedPartsOfSpeech: string[],
  minCorpusCount: number,
  maxCorpusCount: number,
  minDictionaryCount: number,
  maxDictionaryCount: number,
}

export interface GameState {
  availablePartsOfSpeech: string[],
  difficultySettings: DifficultySettings,
  word: string[],
  correctGuesses: string[],
  incorrectGuesses: string[],
  finished: boolean,
  lost: boolean,
}

const gameReducer = (state: GameState = defaultState, action: GameAction) => {
  const maxIncorrectGuesses = 7;
  switch (action.type) {
    case "SET_DIFFICULTY":
      return { ...state, difficultySettings: action.difficultySettings };
    case "SET_WORD":
      return {
        ...state,
        word: action.word.toLowerCase().split(""),
        correctGuesses: [],
        incorrectGuesses: [],
        finished: false,
        lost: false,
      };
    case "APPLY_GUESS":
      if (state.finished) {
        return state;
      }
      const loweredWord = state.word.map((c) => c.toLowerCase());
      const loweredLetter = action.letter.toLowerCase();
      const isCorrect = loweredWord.includes(loweredLetter);
      const correctGuesses =
        isCorrect && !state.correctGuesses.includes(loweredLetter)
          ? [...state.correctGuesses, loweredLetter]
          : state.correctGuesses;
      const incorrectGuesses =
        !isCorrect && !state.incorrectGuesses.includes(loweredLetter)
          ? [...state.incorrectGuesses, loweredLetter]
          : state.incorrectGuesses;
      const lost = incorrectGuesses.length > maxIncorrectGuesses;
      const won = loweredWord.every((c) => correctGuesses.includes(c));
      const finished = won || lost;
      return {
        ...state,
        word: state.word,
        correctGuesses: correctGuesses,
        incorrectGuesses: incorrectGuesses,
        finished: finished,
        lost: lost,
      };
    default:
      return state;
  }
};

export default gameReducer;

export const getDifficultySettings = (state: GameState) => state.difficultySettings;
export const getWord = (state: GameState) => state.word;
export const getLost = (state: GameState) => state.lost;
export const getFinished = (state: GameState) => state.finished;
export const getIncorrectGuesses = (state: GameState) => state.incorrectGuesses;
export const getCorrectGuesses = (state: GameState) => state.correctGuesses;
