import React from 'react'
import PictureDisplay from './PictureDisplay'
import Congratulations from './Congratulations'
import WordDisplay from './WordDisplay'
import Loading from './Loading'
import GuessedLettersDisplay from './GuessedLettersDisplay'
import { connect } from 'react-redux'
import * as actions from './actions'

class Game extends React.Component {
    componentDidMount(){
        this.props.startGame()
    }

    captureGuess(guessElement) {
        this.props.applyGuess(guessElement.value)
        guessElement.value = ''
    }

    render() {
        return <div>
            <PictureDisplay numberOfIncorrectGuesses={this.props.incorrectGuesses.length}/>
            {this.props.isLoading ? <Loading/> :
                this.props.finished ? <Congratulations lost={this.props.lost} word={this.props.unmasked} startOver={() => this.props.startGame()}/> :
                    <div>
                        <WordDisplay word={this.props.word}/>
                        <GuessedLettersDisplay guessedLetters={this.props.incorrectGuesses}/>
                        <input autoFocus type="text" ref="guess" onChange={() => this.captureGuess(this.refs.guess)}/>
                    </div>
            }
            <div><a href="http://www.wordnik.com" target="_blank" rel="noopener noreferrer"><img alt="powered by wordnik" src="wordnik.png"/></a></div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        word: state.masked,
        unmasked: state.unmasked,
        guessedLetters: state.guessedLetters,
        incorrectGuesses: state.incorrectGuesses,
        finished: state.finished,
        lost: state.lost,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        applyGuess: guess => dispatch(actions.applyGuess(guess)),
        setWord: word => dispatch(actions.setWord(word)),
        startGame: () => dispatch(actions.startGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)