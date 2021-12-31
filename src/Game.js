import * as React from "react";
import PictureDisplay from "./PictureDisplay";
import Congratulations from "./Congratulations";
import WordDisplay from "./WordDisplay";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { getGameData } from "./gameReducer";

const Game = () => {
  const dispatch = useDispatch();
  const { applyGuess, startGame } = actions;
  const { incorrectGuesses, finished, lost, word, correctGuesses } =
    useSelector(getGameData);
  React.useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  const handleKeyPress = (e) => {
    captureGuess(e.key);
  };

  const captureGuess = (guess) => {
    if (
      !finished &&
      !correctGuesses.includes(guess) &&
      !incorrectGuesses.includes(guess)
    ) {
      dispatch(applyGuess(guess));
    }
  };

  return (
    <div>
      <PictureDisplay numberOfIncorrectGuesses={incorrectGuesses.length} />
      {finished ? (
        <Congratulations
          lost={lost}
          word={word}
          startOver={() => dispatch(startGame())}
        />
      ) : (
        <div>
          <WordDisplay word={word} correctGuesses={correctGuesses} />
          <GuessedLettersDisplay guessedLetters={incorrectGuesses} />
        </div>
      )}
    </div>
  );
};

export default Game;
