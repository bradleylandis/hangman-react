import * as React from "react";
import PictureDisplay from "./PictureDisplay";
import Congratulations from "./Congratulations";
import WordDisplay from "./WordDisplay";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { getCurrentWord, getId } from "./reducers";
import { registerGuess, Status } from "./api";

const Game = () => {
  const dispatch = useDispatch();
  const { startGame } = actions;
  const gameId = useSelector(getId);
  const [incorrectGuesses, setIncorrectGuesses] = React.useState<string[]>([]);
  const [currentWord, setCurrentWord] = React.useState(
    useSelector(getCurrentWord)
  );
  const [status, setStatus] = React.useState<Status>("in progress");

  React.useEffect(() => {
    async function handleKeyPress(this: HTMLDocument, e: KeyboardEvent) {
      await captureGuess(e.key);
    }

    const captureGuess = async (guess: string) => {
      const gameState = await registerGuess(gameId!, guess);
      setCurrentWord(gameState.word);
      setIncorrectGuesses(gameState.incorrectGuesses);
      setStatus(gameState.status);
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  });

  return (
    <div>
      <PictureDisplay numberOfIncorrectGuesses={incorrectGuesses.length} />
      {status !== "in progress" ? (
        <Congratulations
          lost={status === "lost"}
          word={currentWord}
          startOver={() => dispatch(startGame())}
        />
      ) : (
        <div>
          <WordDisplay word={currentWord} />
          <GuessedLettersDisplay guessedLetters={incorrectGuesses} />
        </div>
      )}
    </div>
  );
};

export default Game;
