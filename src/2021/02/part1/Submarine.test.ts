import { assertEquals } from "testing/asserts.ts";
import { Submarine } from "./Submarine.ts";

Deno.test("Should have 0 horizontal and depth to start", () => {
  const sub = new Submarine();
  assertEquals(sub.horizontal, 0);
  assertEquals(sub.depth, 0);
});

Deno.test("Should have 0 horizontal times depth to start", () => {
  const sub = new Submarine();
  assertEquals(sub.horizontalTimesDepth, 0);
});

Deno.test("Should only increase horizontal when moving forward", () => {
  const sub = new Submarine();
  sub.executeCommands({ type: "forward", amount: 1 }, {
    type: "forward",
    amount: 2,
  }, { type: "forward", amount: 3 });
  assertEquals(sub.horizontal, 6);
  assertEquals(sub.depth, 0);
});

Deno.test("Should only increase depth when moving down", () => {
  const sub = new Submarine();
  sub.executeCommands(
    { type: "down", amount: 1 },
    { type: "down", amount: 2 },
    { type: "down", amount: 3 },
  );
  assertEquals(sub.horizontal, 0);
  assertEquals(sub.depth, 6);
});

Deno.test("Should have no depth if moving down and up the same amount", () => {
  const sub = new Submarine();
  sub.executeCommands(
    { type: "down", amount: 1 },
    { type: "down", amount: 2 },
    { type: "down", amount: 3 },
    { type: "up", amount: 1 },
    { type: "up", amount: 2 },
    { type: "up", amount: 3 },
  );
  assertEquals(sub.horizontal, 0);
  assertEquals(sub.depth, 0);
});

Deno.test("Should have 0 horizontal times depth to if only moved horizontal", () => {
  const sub = new Submarine();
  sub.executeCommands({ type: "forward", amount: 2 }, {
    type: "forward",
    amount: 3,
  }, { type: "forward", amount: 4 });
  assertEquals(sub.horizontalTimesDepth, 0);
});

Deno.test("Should have 0 horizontal times depth to if only moved down", () => {
  const sub = new Submarine();
  sub.executeCommands(
    { type: "down", amount: 2 },
    { type: "down", amount: 3 },
    { type: "down", amount: 4 },
  );
  assertEquals(sub.horizontalTimesDepth, 0);
});

Deno.test("Should have horizontal times depth match horizontal times depth", () => {
  const sub = new Submarine();
  sub.executeCommands({ type: "forward", amount: 2 }, {
    type: "down",
    amount: 3,
  });
  assertEquals(sub.horizontal, 2);
  assertEquals(sub.depth, 3);
  assertEquals(sub.horizontalTimesDepth, 6);
});
