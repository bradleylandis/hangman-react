import React from "react";
import PropTypes from "prop-types";

const Congratulations = ({ word, startOver, lost }) => {
  return (
    <div>
      <h1>
        {lost ? "Sorry" : "Congratulations"}! The word was {word}.
      </h1>
      <button onClick={() => startOver()}>Play again</button>
    </div>
  );
};

Congratulations.propTypes = {
  word: PropTypes.string.isRequired,
  startOver: PropTypes.func.isRequired,
  lost: PropTypes.bool.isRequired,
};

export default Congratulations;
