import React from 'react'
import PictureDisplay from './PictureDisplay'
import Congratulations from './Congratulations'
import WordDisplay from './WordDisplay'
import Loading from './Loading'
import GuessedLettersDisplay from './GuessedLettersDisplay'
import Error from './Error'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getGameData } from './reducers'

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
                this.props.isError ? <Error tryAgain={() => this.props.startGame()}/> :
                this.props.finished ? <Congratulations lost={this.props.lost} word={this.props.unmasked} startOver={() => this.props.startGame()}/> :
                    <div>
                        <WordDisplay word={this.props.word}/>
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