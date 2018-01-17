import React from 'react'

const WordDisplay = ({word, correctGuesses}) => {
    return <h1>{word.map(letter => (correctGuesses.includes(letter) ? letter : '_') + ' ')} ({word.length} letters)</h1>
}

export default WordDisplay