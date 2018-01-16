const wordReducer = (state = {guessedLetters: [], incorrectGuesses: [], isLoading: true}, action) => {
    const maxIncorrectGuesses = 7
    switch (action.type) {
        case 'SET_WORD':
            return {
                unmasked: action.word.split(''),
                masked: action.word.split('').map(() => '_'),
                guessedLetters: [],
                incorrectGuesses: [],
                isLoading: false
            }
        case 'APPLY_GUESS':
            const guessedLetters = state.guessedLetters.includes(action.letter) ? state.guessedLetters : [...state.guessedLetters, action.letter]
            const incorrectGuesses = guessedLetters.filter(l => !state.unmasked.includes(l))
            const lost = incorrectGuesses.length > maxIncorrectGuesses
            const won = state.unmasked.every(c => guessedLetters.includes(c))
            const finished = won || lost
            return {
                ...state,
                masked: state.unmasked.map(c => guessedLetters.includes(c) ? c : '_'),
                guessedLetters: guessedLetters,
                incorrectGuesses: incorrectGuesses,
                finished: finished,
                lost: lost
            }
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export const getGameData = state => {
    return {
        word: state.masked,
        unmasked: state.unmasked,
        guessedLetters: state.guessedLetters,
        incorrectGuesses: state.incorrectGuesses,
        finished: state.finished,
        lost: state.lost,
        isLoading: state.isLoading,
        isError: state.isError
    }
}

export default wordReducer