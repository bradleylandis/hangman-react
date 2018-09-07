import {gameReducer} from "./gameReducer";
import * as actions from "./actions";

describe('gameReducer', () => {
    it('returns default', () => {
        let expectedState = {
            word: [],
            correctGuesses: [],
            incorrectGuesses: [],
            finished: false,
            lost: false
        };

        const result = gameReducer(undefined, {type: 'NONE'})

        expect(result).toEqual(expectedState)
    })

    it('adds word and resets correctGuesses and incorrectGuesses when SET_WORD', () => {
        const expectedState = {
            word: ['t', 'e', 's', 't'],
            correctGuesses: [],
            incorrectGuesses: [],
            finished: false,
            lost: false
        }
        const result = gameReducer(undefined, actions.setWord('test'))

        expect(result).toEqual(expectedState)
    })

    it('adds letter to correctGuesses when APPLY_GUESS with correct guess', () => {
        const initialState = {
            word: 'test'.split(''),
            correctGuesses: [],
            incorrectGuesses: []
        }
        const newGuess = 't'
        const expectedState = {
            word: initialState.word,
            correctGuesses: [...initialState.correctGuesses, newGuess],
            incorrectGuesses: [],
            finished: false,
            lost: false
        }
        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })

    it('does not add duplicates to correctGuesses when APPLY_GUESS with correct guess that was already guessed', () => {
        const initialState = {
            word: 'test'.split(''),
            correctGuesses: ['t'],
            incorrectGuesses: []
        }
        const newGuess = 't'
        const expectedState = {
            word: initialState.word,
            correctGuesses: initialState.correctGuesses,
            incorrectGuesses: initialState.incorrectGuesses,
            finished: false,
            lost: false
        }
        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })

    it('adds letter to incorrectGuesses when APPLY_GUESS with incorrect guess', () => {
        const initialState = {
            word: 'test'.split(''),
            correctGuesses: [],
            incorrectGuesses: []
        }
        const newGuess = 'z'
        const expectedState = {
            word: initialState.word,
            correctGuesses: initialState.correctGuesses,
            incorrectGuesses: [...initialState.incorrectGuesses, newGuess],
            finished: false,
            lost: false
        }

        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })


    it('does not add duplicates to incorrectGuesses when APPLY_GUESS with incorrect guess that was already guessed', () => {
        const initialState = {
            word: 'test'.split(''),
            correctGuesses: [],
            incorrectGuesses: ['z']
        }
        const newGuess = 'z'
        const expectedState = {
            word: initialState.word,
            correctGuesses: initialState.correctGuesses,
            incorrectGuesses: initialState.incorrectGuesses,
            finished: false,
            lost: false
        }

        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })

    it('marks the game as finished when APPLY_GUESS with last correct guess', () => {
        const initialState = {
            word: 'test'.split(''),
            correctGuesses: ['t', 'e'],
            incorrectGuesses: []
        }
        const newGuess = 's'
        const expectedState = {
            word: initialState.word,
            correctGuesses: [...initialState.correctGuesses, newGuess],
            incorrectGuesses: [],
            finished: true,
            lost: false
        }

        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })

    it('marks the game as finished and lost when APPLY_GUESS with last incorrect guess', () => {
        const initialState = {
            word: 'zzzz'.split(''),
            correctGuesses: [],
            incorrectGuesses: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        }
        const newGuess = 'h'
        const expectedState = {
            word: initialState.word,
            correctGuesses: initialState.correctGuesses,
            incorrectGuesses: [...initialState.incorrectGuesses, newGuess],
            finished: true,
            lost: true
        }

        const result = gameReducer(initialState, actions.applyGuess(newGuess))

        expect(result).toEqual(expectedState)
    })
})