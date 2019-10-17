import React from 'react'

const Error = ({tryAgain}) => {
    return <h1>Unable to load a word.  Please <a href="#" onClick={tryAgain}>try again</a></h1>
}

export default Error