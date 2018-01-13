import React from 'react'

const WordDisplay = ({word}) => {
    return <h1>{word.map(l => l + ' ')} ({word.length} letters)</h1>
}

export default WordDisplay