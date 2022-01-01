interface PictureDisplayProps {
  numberOfIncorrectGuesses: number
}

const PictureDisplay = ({ numberOfIncorrectGuesses }: PictureDisplayProps) => {
  return (
    <img
      alt={`hangman with ${numberOfIncorrectGuesses} incorrect guesses`}
      src={`hangman${numberOfIncorrectGuesses}.png`}
    />
  );
};

export default PictureDisplay;
