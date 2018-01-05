import React from 'react'
import PictureDisplay from './PictureDisplay'
import Congratulations from './Congratulations'
import WordDisplay from './WordDisplay'
import Loading from './Loading'
import GuessedLettersDisplay from './GuessedLettersDisplay'

const maxIncorrectGuesses = 7

class Game extends React.Component {
    state = {
        word: '',
        guessedLetters: [],
        finished: false,
        lost: false,
        isLoading: true,
        incorrectGuesses: []
    }

    componentDidMount(){
        this.startGame()
    }

    startGame(){
        this.setState({incorrectGuesses: [], isLoading: true, lost: false, finished:false})
        fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=503890e5c73712c79d3090fb3840a8220541b1c15372a08d8')
            .then(response =>  {
                return response.json()
            })
            .then(data => {
                this.setState({
                    word: data[0].word.toLowerCase(),
                    guessedLetters: [],
                    finished: false,
                    isLoading: false,
                    incorrectGuesses: []
                })
            })
    }

    captureGuess(guessElement) {
        this.applyGuess(guessElement.value.toLowerCase())
        guessElement.value = ''
    }

    applyGuess(guess) {
        const guessedLetters = this.state.guessedLetters.includes(guess) ? this.state.guessedLetters : [...this.state.guessedLetters,guess]
        const incorrectGuesses = guessedLetters.filter(l => !this.state.word.split('').includes(l))
        const numberOfIncorrectGuesses = incorrectGuesses.length
        const lost = numberOfIncorrectGuesses > maxIncorrectGuesses
        const finished = this.state.word.split('').every(c => guessedLetters.includes(c)) || lost
        this.setState({
            guessedLetters: guessedLetters,
            incorrectGuesses: incorrectGuesses,
            finished: finished,
            lost: lost
        })
    }

    render() {
        return <div>
            <PictureDisplay numberOfIncorrectGuesses={this.state.incorrectGuesses.length}/>
            {this.state.isLoading ? <Loading/> :
                this.state.finished ? <Congratulations lost={this.state.lost} word={this.state.word} startOver={() => this.startGame()}/> :
                    <div>
                        <WordDisplay word={this.state.word} guessedLetters={this.state.guessedLetters}/>
                        <GuessedLettersDisplay guessedLetters={this.state.incorrectGuesses}/>
                        <input autoFocus type="text" ref="guess" onChange={() => this.captureGuess(this.refs.guess)}/>
                    </div>
            }
            <div><a href="http://www.wordnik.com" target="_blank" rel="noopener noreferrer"><img alt="powered by wordnik" src="wordnik.png"/></a></div>
        </div>
    }
}

export default Game