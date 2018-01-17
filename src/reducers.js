import { combineReducers } from 'redux'

const wordReducer = (state = {guessedLetters: [], incorrectGuesses: []}, action) => {
    const maxIncorrectGuesses = 7
    switch (action.type) {
        case 'SET_WORD':
            return {
                word: action.word.split(''),
                guessedLetters: [],
                incorrectGuesses: []
            }
        case 'APPLY_GUESS':
            const guessedLetters = state.guessedLetters.includes(action.letter) ? state.guessedLetters : [...state.guessedLetters, action.letter]
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

const gameReducer = (state = {isLoading: true, isError: false}, action) => {
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
        isLoading: state.game.isLoading,
        isError: state.game.isError
    }
}

export const getGameData = state => {
    return {
        word: state.word.word,
        guessedLetters: state.word.guessedLetters,
        incorrectGuesses: state.word.incorrectGuesses,
        finished: state.word.finished,
        lost: state.word.lost
    }
}

export default combineReducers({word: wordReducer, game: gameReducer})