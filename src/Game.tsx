import * as React from "react";
import PictureDisplay from "./PictureDisplay";
import Congratulations from "./Congratulations";
import WordDisplay from "./WordDisplay";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { registerGuess, Status } from "./api";

interface GameProps {
  id: string;
  currentWord: string;
  startGame: () => void;
  setCurrentWord: (word: string) => void;
}

const Game = ({ id, currentWord, startGame, setCurrentWord }: GameProps) => {
  const [incorrectGuesses, setIncorrectGuesses] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<Status>("in progress");

  React.useEffect(() => {
    async function handleKeyPress(this: HTMLDocument, e: KeyboardEvent) {
      await captureGuess(e.key);
    }

    const captureGuess = async (guess: string) => {
      const gameState = await registerGuess(id, guess);
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
          startOver={() => startGame()}
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
