import React from 'react'
import {shallow} from 'enzyme'
import Congratulations from './Congratulations'

describe('Congratulations', () => {
    it('displays Congratulations when you have won', () => {
        const wrapper = shallow(<Congratulations lost={false} word="test"/>)

        expect(wrapper.find('h1').text()).toEqual('Congratulations! The word was test.')
    })

    it('displays Sorry when you have lost', () => {
        const wrapper = shallow(<Congratulations lost={true} word="test"/>)

        expect(wrapper.find('h1').text()).toEqual('Sorry! The word was test.')
    })
})