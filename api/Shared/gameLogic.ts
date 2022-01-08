export const concealWord = (word, correctGuesses) =>
  word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join("");
