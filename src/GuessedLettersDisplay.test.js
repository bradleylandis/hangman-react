import {shallow} from "enzyme";
import React from "react";
import GuessedLettersDisplay from "./GuessedLettersDisplay";

describe('GuessedLettersDisplay', () => {
    it('displays each letter that has been guessed', () => {
        const guessedLetters = ['a', 'b', 'c']
        const wrapper = shallow(<GuessedLettersDisplay guessedLetters={guessedLetters}/>)

        expect(wrapper.find('h1').children().map(c => c.text().trim())).toEqual(guessedLetters)
    })
})