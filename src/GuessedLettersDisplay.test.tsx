import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { screen, render } from "@testing-library/react";

describe("GuessedLettersDisplay", () => {
  it("displays each letter that has been guessed", () => {
    const guessedLetters = ["a", "b", "c"];
    render(<GuessedLettersDisplay guessedLetters={guessedLetters} />);

    const letterA = screen.getByText("a");
    expect(letterA).toBeInTheDocument();

    const letterB = screen.getByText("b");
    expect(letterB).toBeInTheDocument();

    const letterC = screen.getByText("c");
    expect(letterC).toBeInTheDocument();
  });
});
