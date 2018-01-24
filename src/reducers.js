import {combineReducers} from 'redux'

export const gameReducer = (state = {word: [], correctGuesses: [], incorrectGuesses: [], finished: false, lost: false}, action) => {
    const maxIncorrectGuesses = 7
    switch (action.type) {
        case 'SET_WORD':
            return {
                word: action.word.split(''),
                correctGuesses: [],
                incorrectGuesses: [],
                finished: false,
                lost: false
            }
        case 'APPLY_GUESS':
            if(state.finished) {
                return state;
            }
            const loweredWord = state.word.map(c => c.toLowerCase())
            const loweredLetter = action.letter.toLowerCase()
            const isCorrect = loweredWord.includes(loweredLetter)
            const correctGuesses = isCorrect && !state.correctGuesses.includes(loweredLetter) ?
                [...state.correctGuesses, loweredLetter] :
                state.correctGuesses
            const incorrectGuesses = !isCorrect && !state.incorrectGuesses.includes(loweredLetter) ?
                [...state.incorrectGuesses, loweredLetter] :
                state.incorrectGuesses
            const lost = incorrectGuesses.length > maxIncorrectGuesses
            const won = loweredWord.every(c => correctGuesses.includes(c))
            const finished = won || lost
            return {
                word: state.word,
                correctGuesses: correctGuesses,
                incorrectGuesses: incorrectGuesses,
                finished: finished,
                lost: lost
            }
        default:
            return state
    }
}

export const appReducer = (state = {isLoading: true, isError: false}, action) => {
    switch (action.type) {
        case 'SET_WORD':
            return {
                isLoading: false,
                isError: false
            }
        case 'START_LOADING':
            return {
                isLoading: true,
                isError: false
            }
        case 'SET_ERROR':
            return {
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export const getAppData = state => {
    return {
        isLoading: state.app.isLoading,
        isError: state.app.isError
    }
}

export const getGameData = state => {
    return {
        word: state.game.word,
        correctGuesses: state.game.correctGuesses,
        incorrectGuesses: state.game.incorrectGuesses,
        finished: state.game.finished,
        lost: state.game.lost
    }
}

export default combineReducers({game: gameReducer, app: appReducer})