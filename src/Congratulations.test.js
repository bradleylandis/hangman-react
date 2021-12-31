import React from "react";
import Congratulations from "./Congratulations";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Congratulations", () => {
  it("displays Congratulations when you have won", () => {
    render(
      <Congratulations
        lost={false}
        word={["t", "e", "s", "t"]}
        startOver={() => {}}
      />
    );

    const message = screen.getByText("Congratulations! The word was test.");

    expect(message).toBeInTheDocument();
  });

  it("displays Sorry when you have lost", () => {
    render(
      <Congratulations
        lost={true}
        word={["t", "e", "s", "t"]}
        startOver={() => {}}
      />
    );

    const message = screen.getByText("Sorry! The word was test.");

    expect(message).toBeInTheDocument();
  });

  it("calls start over when clicking Play Again", () => {
    const startOver = jest.fn();
    render(<Congratulations startOver={startOver} word={[]} lost={false} />);

    const button = screen.getByRole("button", { name: "Play again" });
    userEvent.click(button);

    expect(startOver).toHaveBeenCalled();
  });
});
