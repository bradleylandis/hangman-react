interface WordDisplayProps {
  word: string;
}

const WordDisplay = ({ word }: WordDisplayProps) => {
  return (
    <h1>
      {word
        .split("")
        .map((letter) => letter + " ")
        .join("")}
      ({word.length} letters)
    </h1>
  );
};

export default WordDisplay;
