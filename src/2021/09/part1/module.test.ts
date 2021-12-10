import { assertEquals } from "testing/asserts.ts";
import { run } from "./module.ts";

Deno.test("Should give the correct result for the example", () => {
  assertEquals(
    run(
      `2199943210
3987894921
9856789892
8767896789
9899965678`,
    ),
    15,
  );
});
