import PictureDisplay from "./PictureDisplay";
import { screen, render } from "@testing-library/react";

describe("PictureDisplay", () => {
  it("displays the corresponding image for the number of wrong guesses", () => {
    render(<PictureDisplay numberOfIncorrectGuesses={1} />);

    const image = screen.getByRole("img");

    expect(image.getAttribute("src")).toBe("hangman1.png");
  });

  it("displays the alt text for the number of wrong guesses", () => {
    render(<PictureDisplay numberOfIncorrectGuesses={1} />);

    const image = screen.getByAltText("hangman with 1 incorrect guesses");

    expect(image).toBeInTheDocument();
  });
});
