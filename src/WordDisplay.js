import React from 'react'

const WordDisplay = ({word, guessedLetters}) => {
    return <h1>{word.map(letter => (guessedLetters.includes(letter) ? letter : '_') + ' ')} ({word.length} letters)</h1>
}

export default WordDisplay