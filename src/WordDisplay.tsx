interface WordDisplayProps {
  word: string[];
  correctGuesses: string[];
}

const WordDisplay = ({ word, correctGuesses }: WordDisplayProps) => {
  return (
    <h1>
      {word.map(
        (letter) => (correctGuesses.includes(letter) ? letter : "_") + " "
      )}
      ({word.length} letters)
    </h1>
  );
};

export default WordDisplay;
