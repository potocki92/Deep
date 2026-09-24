import { describe, expect, it } from "vitest";
import { GAME_CORE_PACKAGE } from "../src/index.js";

describe("game-core package boundary", () => {
  it("is importable without a framework runtime", () => {
    expect(GAME_CORE_PACKAGE).toBe("@glebia/game-core");
  });
});
