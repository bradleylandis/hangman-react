import React from 'react'

const WordDisplay = ({word, guessedLetters}) => {
    const characters = word.split('')
    return <h1>{characters.map(c => guessedLetters.includes(c) ? c : '-')} ({characters.length} letters)</h1>
}

export default WordDisplay