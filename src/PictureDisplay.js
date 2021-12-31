import React from "react";
import PropTypes from "prop-types";

const PictureDisplay = ({ numberOfIncorrectGuesses }) => {
  return (
    <img
      alt={`hangman with ${numberOfIncorrectGuesses} incorrect guesses`}
      src={`hangman${numberOfIncorrectGuesses}.png`}
    />
  );
};

PictureDisplay.propTypes = {
  numberOfIncorrectGuesses: PropTypes.number.isRequired,
};

export default PictureDisplay;
