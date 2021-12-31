import * as React from "react";
import PropTypes from "prop-types";

const Error = ({ tryAgain }) => {
  return (
    <h1>
      Unable to load a word. Please{" "}
      <button onClick={tryAgain}>try again</button>
    </h1>
  );
};

Error.propTypes = {
  tryAgain: PropTypes.func.isRequired,
};

export default Error;
