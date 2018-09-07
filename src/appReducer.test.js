import {appReducer} from './appReducer'
import * as actions from './actions'

describe('appReducer', () => {
    it('returns isLoading true and isError false for default', () => {
        const expectedState = {isLoading: true, isError: false}
        const result = appReducer(undefined, {type: 'NONE'})

        expect(result).toEqual(expectedState)
    })

    it('returns isLoading true and isError false after SET_WORD', () => {
        const initialState = {isLoading: true, isError: true}
        const expectedState = {isLoading: false, isError: false}
        const result = appReducer(initialState, actions.setWord('test'))

        expect(result).toEqual(expectedState)
    })

    it('returns isLoading true and isError false after START_LOADING', () => {
        const initialState = {isLoading: false, isError: true}
        const expectedState = {isLoading: true, isError: false}
        const result = appReducer(initialState, actions.startLoading())

        expect(result).toEqual(expectedState)
    })

    it('returns isLoading false and isError true after SET_ERROR', () => {
        const initialState = {isLoading: true, isError: false}
        const expectedState = {isLoading: false, isError: true}
        const result = appReducer(initialState, actions.setError())

        expect(result).toEqual(expectedState)
    })
})

