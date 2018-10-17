import api from './api'

export const applyGuess = letter => {
    return {
        type: 'APPLY_GUESS',
        letter: letter
    }
}

export const setWord = word => {
    return {
        type: 'SET_WORD',
        word: word
    }
}

export const setError = () => {
    return {
        type: 'SET_ERROR'
    }
}

export const startLoading = () => {
    return {
        type: 'START_LOADING'
    }
}

export const startGame = () => (dispatch, getState) => {
    dispatch(startLoading)
    return api.fetchWord(getState().game.difficultySettings)
        .then(word => dispatch(setWord(word)))
        .catch(() => dispatch(setError()))
}

export const updateDifficulty = (data) => {
    return {
        type: 'SET_DIFFICULTY',
        difficultySettings: data
    }
}