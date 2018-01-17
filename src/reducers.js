import {combineReducers} from 'redux'

const gameReducer = (state = {guessedLetters: [], incorrectGuesses: []}, action) => {
    const maxIncorrectGuesses = 7
    switch (action.type) {
        case 'SET_WORD':
            return {
                word: action.word.toLowerCase().split(''),
                guessedLetters: [],
                incorrectGuesses: []
            }
        case 'APPLY_GUESS':
            const guessedLetters = state.guessedLetters.includes(action.letter.toLowerCase()) ?
                state.guessedLetters :
                [...state.guessedLetters, action.letter.toLowerCase()]
            const incorrectGuesses = guessedLetters.filter(l => !state.word.includes(l))
            const lost = incorrectGuesses.length > maxIncorrectGuesses
            const won = state.word.every(c => guessedLetters.includes(c))
            const finished = won || lost
            return {
                ...state,
                guessedLetters: guessedLetters,
                incorrectGuesses: incorrectGuesses,
                finished: finished,
                lost: lost
            }
        default:
            return state
    }
}

const appReducer = (state = {isLoading: true, isError: false}, action) => {
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
        guessedLetters: state.game.guessedLetters,
        incorrectGuesses: state.game.incorrectGuesses,
        finished: state.game.finished,
        lost: state.game.lost
    }
}

export default combineReducers({game: gameReducer, app: appReducer})