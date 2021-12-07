import { assertEquals } from "testing/asserts.ts";
import { countDepthIncreases } from "./countDepthIncreases.ts";

Deno.test("Should count the increases between elements", () => {
  assertEquals(countDepthIncreases([1, 2, 3, 4]), 3);
});

Deno.test("Should have no increases for one reading", () => {
  assertEquals(countDepthIncreases([23]), 0);
});

Deno.test("Should have no increases if all readings are the same", () => {
  assertEquals(countDepthIncreases([23, 23, 23, 23]), 0);
});

Deno.test("Should have no increases if reading all decline", () => {
  assertEquals(countDepthIncreases([4, 3, 2, 1]), 0);
});

Deno.test("Should have only one increases if there is only one increase", () => {
  assertEquals(countDepthIncreases([23, 24, 23, 23]), 1);
});
