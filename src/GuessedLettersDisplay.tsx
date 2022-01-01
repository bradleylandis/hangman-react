interface GuessedLettersDisplayProps {
  guessedLetters: string[];
}

const GuessedLettersDisplay = ({
  guessedLetters,
}: GuessedLettersDisplayProps) => {
  return (
    <h1>
      {guessedLetters.map((c) => (
        <span key={c}>
          <span style={{ textDecoration: "line-through" }}>{c}</span>&nbsp;
        </span>
      ))}
    </h1>
  );
};

export default GuessedLettersDisplay;
