const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body><div id="test"></div></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
import {mount} from "enzyme";
import React from "react";
import Game from "./Game";
import configureStore from 'redux-mock-store'

describe('Game', () => {
    it('fails on purpose to test build pipeline', () => {
      expect(1).toBe(2);
    })

    it('calls applyGuess when new guess is made', () => {
        // let guess = '';
        //
        // const applyGuess = (e) => {
        //     console.log('apply guess')
        //     guess = e;
        // }
        //
        // const mockStore = configureStore();
        //
        // const store = mockStore({game:{incorrectGuesses:[], word:[]}})
        //
        // const wrapper = mount(<Game store={store} applyGuess={applyGuess}/>)
        //
        // wrapper.simulate("keypress", {key: 's'})
        //
        // expect(guess).toBe('s');
    })
})
