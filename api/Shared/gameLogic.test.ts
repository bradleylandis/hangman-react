import { isInProgress } from "./gameLogic";

describe("gameLogic", () => {
  describe("isInProgress", () => {
    it("returns true if status is in progress", () => {
      expect(isInProgress("in progress")).toBeTruthy();
    });

    it("returns false if status is lost", () => {
      expect(isInProgress("lost")).toBeFalsy();
    });
  });
});
