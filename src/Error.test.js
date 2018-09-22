import React from 'react'
import {shallow} from 'enzyme'
import Error from './Error'

describe('Error', () => {
    it('calls try again when clicking try again', () => {
        let hasCalledTryAgain = false;
        const tryAgain = () => {
            hasCalledTryAgain = true
        }
        const wrapper = shallow(<Error tryAgain={tryAgain}/>)

        wrapper.find('a').simulate('click')

        expect(hasCalledTryAgain).toBe(true)
    })
})