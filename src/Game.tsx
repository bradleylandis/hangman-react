import * as React from "react";
import PictureDisplay from "./PictureDisplay";
import Congratulations from "./Congratulations";
import WordDisplay from "./WordDisplay";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import {
  getWord,
  getCorrectGuesses,
  getIncorrectGuesses,
  getFinished,
  getLost,
  getId,
} from "./reducers";
import { registerGuess } from "./api";
import { useAuth0 } from "@auth0/auth0-react";

const Game = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const { applyGuess, startGame } = actions;
  const correctGuesses = useSelector(getCorrectGuesses);
  const incorrectGuesses = useSelector(getIncorrectGuesses);
  const finished = useSelector(getFinished);
  const lost = useSelector(getLost);
  const word = useSelector(getWord);
  const gameId = useSelector(getId);

  React.useEffect(() => {
    async function handleKeyPress(this: HTMLDocument, e: KeyboardEvent) {
      await captureGuess(e.key);
    }

    const captureGuess = async (guess: string) => {
      await registerGuess(gameId!, guess);
      const normalizedGuess = guess.toLowerCase();
      if (
        !finished &&
        !correctGuesses.includes(normalizedGuess) &&
        !incorrectGuesses.includes(normalizedGuess)
      ) {
        dispatch(applyGuess(normalizedGuess));
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  });

  return (
    <div>
      <PictureDisplay numberOfIncorrectGuesses={incorrectGuesses.length} />
      {finished ? (
        <Congratulations
          lost={lost}
          word={word}
          startOver={() => dispatch(startGame(user?.sub!))}
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
