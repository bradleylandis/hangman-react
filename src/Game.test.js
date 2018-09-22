// import 'jsdom-global/register'
import {mount} from "enzyme";
import React from "react";
import Game from "./Game";
import configureStore from 'redux-mock-store'

describe('Game', () => {
    it('calls applyGuess when new guess is made', () => {
        // let guess = '';
        //
        // const applyGuess = (e) => {
        //     guess = e;
        // }
        //
        // const mockStore = configureStore();
        //
        // const store = mockStore({game:{incorrectGuesses:[], word:[]}})
        //
        // const wrapper = mount(<Game store={store} applyGuess={applyGuess}></Game>, { attachTo: document.body })
        //
        // wrapper.simulate("keyPress", {key: 's'})
        //
        // expect(guess).toBe('s');
    })
})
