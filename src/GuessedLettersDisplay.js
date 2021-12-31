import React from "react";
import PropTypes from "prop-types";

const GuessedLettersDisplay = ({ guessedLetters }) => {
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

GuessedLettersDisplay.propTypes = {
  guessedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GuessedLettersDisplay;
