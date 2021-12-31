import { shallow } from "enzyme";
import React from "react";
import WordDisplay from "./WordDisplay";

describe("WordDisplay", () => {
  it("displays each letter that has been guessed and underscores", () => {
    const wrapper = shallow(
      <WordDisplay word={["t", "e", "s", "t"]} correctGuesses={["t"]} />
    );

    expect(wrapper.find("h1").text()).toEqual("t _ _ t  (4 letters)");
  });
});
