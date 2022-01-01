import Error from "./Error";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Error", () => {
  it("calls try again when clicking try again", () => {
    const tryAgain = jest.fn();
    render(<Error tryAgain={tryAgain} />);

    const button = screen.getByRole("button", { name: "try again" });
    userEvent.click(button);

    expect(tryAgain).toHaveBeenCalled();
  });
});
