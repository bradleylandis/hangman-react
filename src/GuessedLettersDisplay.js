import React from 'react'

const GuessedLettersDisplay = ({guessedLetters}) => {
    return <h1>{guessedLetters.map(c => <span key={c}><span style={{textDecoration: 'line-through'}}>{c}</span>&nbsp;</span>)}</h1>
}

export default GuessedLettersDisplay