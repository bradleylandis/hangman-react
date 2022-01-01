import WordDisplay from "./WordDisplay";
import { screen, render } from "@testing-library/react";

describe("WordDisplay", () => {
  it("displays each letter that has been guessed and underscores", async () => {
    render(<WordDisplay word={["t", "e", "s", "t"]} correctGuesses={["t"]} />);

    const display = await screen.findByText("t _ _ t (4 letters)");
    expect(display).toBeInTheDocument();
  });
});
