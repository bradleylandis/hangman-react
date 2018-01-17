import api from './api'

export const applyGuess = letter => {
    return {
        type: 'APPLY_GUESS',
        letter: letter
    }
}

const setWord = word => {
    return {
        type: 'SET_WORD',
        word: word
    }
}

const setError = () => {
    return {
        type: 'SET_ERROR'
    }
}

const startLoading = () => {
    return {
        type: 'START_LOADING'
    }
}

export const startGame = () => dispatch => {
    dispatch(startLoading)
    return api.fetchWord()
        .then(word => dispatch(setWord(word)))
        .catch(() => dispatch(setError()))
}