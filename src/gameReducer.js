const availablePartsOfSpeech = ['noun','verb','adjective','adverb','preposition','conjunction','verb-transitive']
const selectedPartsOfSpeech = ['noun','verb','adjective','adverb','conjunction','verb-transitive']
const defaultDifficultySettings = {
    minLength: 7,
    maxLength: 15,
    selectedPartsOfSpeech: selectedPartsOfSpeech,
    minCorpusCount: 1000000,
    maxCorpusCount: -1,
    minDictionaryCount: 1,
    maxDictionaryCount: -1
}

const defaultState = {
    availablePartsOfSpeech: availablePartsOfSpeech,
    difficultySettings: defaultDifficultySettings,
    word: [],
    correctGuesses: [],
    incorrectGuesses: [],
    finished: false,
    lost: false
}

export const gameReducer = (state = defaultState, action) => {
    const maxIncorrectGuesses = 7
    switch (action.type) {
        case 'SET_DIFFICULTY':
            return { ...state, difficultySettings: action.difficultySettings }
        case 'SET_WORD':
            return {
                ...state,
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
                ...state,
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

export const getGameData = state => {
    return {
        word: state.game.word,
        correctGuesses: state.game.correctGuesses,
        incorrectGuesses: state.game.incorrectGuesses,
        finished: state.game.finished,
        lost: state.game.lost,
        difficultySettings: state.game.difficultySettings,
        availablePartsOfSpeech: state.game.availablePartsOfSpeech
    }
}