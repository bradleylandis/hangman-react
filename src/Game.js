import React from 'react'
import PictureDisplay from './PictureDisplay'
import Congratulations from './Congratulations'
import WordDisplay from './WordDisplay'
import GuessedLettersDisplay from './GuessedLettersDisplay'
import {connect} from 'react-redux'
import * as actions from './actions'
import {getGameData} from './gameReducer'

class Game extends React.Component {
    constructor() {
        super()

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress(e) {
        this.captureGuess(e.key)
    }

    captureGuess(guess) {
        if (!this.props.finished &&
            !this.props.correctGuesses.includes(guess) &&
            !this.props.incorrectGuesses.includes(guess)) {
            this.props.applyGuess(guess)
        }
    }

    render() {
        return <div>
            <PictureDisplay numberOfIncorrectGuesses={this.props.incorrectGuesses.length}/>
            {this.props.finished ? <Congratulations lost={this.props.lost}
                                                    word={this.props.word}
                                                    startOver={() => this.props.startGame()}/> :
                <div>
                    <WordDisplay word={this.props.word} correctGuesses={this.props.correctGuesses}/>
                    <GuessedLettersDisplay guessedLetters={this.props.incorrectGuesses}/>
                </div>
            }
        </div>
    }
}

const mapStateToProps = state => {
    return getGameData(state)
}

const mapDispatchToProps = ({
    applyGuess: actions.applyGuess,
    startGame: actions.startGame
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)