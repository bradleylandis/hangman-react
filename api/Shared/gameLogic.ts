import { GameType } from "./game";

export const concealWord = (word: string, correctGuesses: string[]): string =>
  word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join("");

export const isInProgress = (status: string): boolean =>
  status === "in progress";

export const registerGuess = (game: GameType, guess: string): GameType => {
  const maxIncorrectGuesses = 7;

  if (!isInProgress(game.status)) {
    return game;
  }
  const loweredWord = game.word.toLowerCase();
  const loweredLetter = guess.toLowerCase();
  const isCorrect = loweredWord.includes(loweredLetter);
  game.correctGuesses =
    isCorrect && !game.correctGuesses.includes(loweredLetter)
      ? [...game.correctGuesses, loweredLetter]
      : game.correctGuesses;
  game.incorrectGuesses =
    !isCorrect && !game.incorrectGuesses.includes(loweredLetter)
      ? [...game.incorrectGuesses, loweredLetter]
      : game.incorrectGuesses;
  const lost = game.incorrectGuesses.length > maxIncorrectGuesses;
  const won = loweredWord
    .split("")
    .every((c) => game.correctGuesses.includes(c));
  game.status = won ? "won" : lost ? "lost" : "in progress";
  game.endedAt = won || lost ? new Date(Date.now()) : undefined;
};

export const getCurrentWord = (game: GameType): string =>
  isInProgress(game.status)
    ? concealWord(game.word, game.correctGuesses)
    : game.word;
