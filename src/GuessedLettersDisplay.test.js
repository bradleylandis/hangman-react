import React from "react";
import GuessedLettersDisplay from "./GuessedLettersDisplay";
import { screen, render } from "@testing-library/react";

describe("GuessedLettersDisplay", () => {
  it("displays each letter that has been guessed", () => {
    const guessedLetters = ["a", "b", "c"];
    render(<GuessedLettersDisplay guessedLetters={guessedLetters} />);

    const letterA = screen.getByText("a");
    expect(letterA).toBeInTheDocument();

    const letterB = screen.getByText("a");
    expect(letterB).toBeInTheDocument();

    const letterC = screen.getByText("a");
    expect(letterC).toBeInTheDocument();
  });
});
