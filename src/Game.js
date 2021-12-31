import React from "react";
import PictureDisplay from "./PictureDisplay";
import Congratulations from "./Congratulations";
import WordDisplay from "./WordDisplay";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { connect } from "react-redux";
import * as actions from "./actions";
import { getGameData } from "./gameReducer";
import PropTypes from "prop-types";

class Game extends React.Component {
  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress(e) {
    this.captureGuess(e.key);
  }

  captureGuess(guess) {
    if (
      !this.props.finished &&
      !this.props.correctGuesses.includes(guess) &&
      !this.props.incorrectGuesses.includes(guess)
    ) {
      this.props.applyGuess(guess);
    }
  }

  render() {
    const {
      incorrectGuesses,
      finished,
      lost,
      word,
      startGame,
      correctGuesses,
    } = this.props;

    return (
      <div>
        <PictureDisplay numberOfIncorrectGuesses={incorrectGuesses.length} />
        {finished ? (
          <Congratulations
            lost={lost}
            word={word}
            startOver={() => startGame()}
          />
        ) : (
          <div>
            <WordDisplay word={word} correctGuesses={correctGuesses} />
            <GuessedLettersDisplay guessedLetters={incorrectGuesses} />
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  finished: PropTypes.bool.isRequired,
  correctGuesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  incorrectGuesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  applyGuess: PropTypes.func.isRequired,
  lost: PropTypes.bool.isRequired,
  word: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  startGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return getGameData(state);
};

const mapDispatchToProps = {
  applyGuess: actions.applyGuess,
  startGame: actions.startGame,
  updateDifficulty: actions.updateDifficulty,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
