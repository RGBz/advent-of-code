import { assertEquals } from "testing/asserts.ts";
import { Submarine } from "./Submarine.ts";

Deno.test("Should give the correct result for the example", () => {
  const sub = new Submarine();
  sub.executeCommands(
    { type: "forward", amount: 5 },
    { type: "down", amount: 5 },
    { type: "forward", amount: 8 },
    { type: "up", amount: 3 },
    { type: "down", amount: 8 },
    { type: "forward", amount: 2 },
  );
  assertEquals(sub.horizontal, 15);
  assertEquals(sub.depth, 60);
  assertEquals(sub.aim, 10);
  assertEquals(sub.horizontalTimesDepth, 900);
});
