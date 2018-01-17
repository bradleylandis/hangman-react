import React from 'react'
import PictureDisplay from './PictureDisplay'
import Congratulations from './Congratulations'
import WordDisplay from './WordDisplay'
import GuessedLettersDisplay from './GuessedLettersDisplay'
import {connect} from 'react-redux'
import * as actions from './actions'
import {getGameData} from './reducers'

class Game extends React.Component {
    captureGuess(guessElement) {
        if (!this.props.guessedLetters.includes(guessElement.value)) {
            this.props.applyGuess(guessElement.value)
        }
        guessElement.value = ''
    }

    render() {
        return <div>
            <PictureDisplay numberOfIncorrectGuesses={this.props.incorrectGuesses.length}/>
            {this.props.finished ? <Congratulations lost={this.props.lost}
                                                    word={this.props.word}
                                                    startOver={() => this.props.startGame()}/> :
                <div>
                    <WordDisplay word={this.props.word} guessedLetters={this.props.guessedLetters}/>
                    <GuessedLettersDisplay guessedLetters={this.props.incorrectGuesses}/>
                    <input autoFocus type="text" ref="guess" onChange={() => this.captureGuess(this.refs.guess)}/>
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