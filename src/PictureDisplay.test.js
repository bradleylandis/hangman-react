import PictureDisplay from "./PictureDisplay";
import { shallow } from "enzyme";
import React from "react";

describe("PictureDisplay", () => {
  it("displays the corresponding image for the number of wrong guesses", () => {
    const wrapper = shallow(<PictureDisplay numberOfIncorrectGuesses={1} />);

    expect(wrapper.find("img").prop("src")).toEqual("hangman1.png");
  });

  it("displays the alt text for the number of wrong guesses", () => {
    const wrapper = shallow(<PictureDisplay numberOfIncorrectGuesses={1} />);

    expect(wrapper.find("img").prop("alt")).toEqual(
      "hangman with 1 incorrect guesses"
    );
  });
});
