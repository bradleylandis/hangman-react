import React from "react";
import PropTypes from "prop-types";

const WordDisplay = ({ word, correctGuesses }) => {
  return (
    <h1>
      {word.map(
        (letter) => (correctGuesses.includes(letter) ? letter : "_") + " "
      )}{" "}
      ({word.length} letters)
    </h1>
  );
};

WordDisplay.propTypes = {
  word: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctGuesses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WordDisplay;
