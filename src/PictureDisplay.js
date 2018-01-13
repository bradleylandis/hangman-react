import React from 'react'

const PictureDisplay = ({numberOfIncorrectGuesses}) => {
    return <img alt={`hangman with ${numberOfIncorrectGuesses} incorrect guesses`} src={`hangman${numberOfIncorrectGuesses}.png`}/>
}

export default PictureDisplay