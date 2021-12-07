import { assertEquals } from "testing/asserts.ts";
import { countWindowedDepthIncreases } from "./countWindowedDepthIncreases.ts";

Deno.test("Should count the increases between windows", () => {
  assertEquals(countWindowedDepthIncreases([1, 2, 3, 4, 5, 6], 3), 3);
});

Deno.test("Should return 0 if the number of elements is less than the window size", () => {
  assertEquals(countWindowedDepthIncreases([1, 2], 3), 0);
});

Deno.test("Should return 0 if the number of elements is the same as the window size", () => {
  assertEquals(countWindowedDepthIncreases([1, 2, 3], 3), 0);
});

Deno.test("Should return 0 if there are no differences", () => {
  assertEquals(countWindowedDepthIncreases([1, 1, 1, 1, 1, 1], 3), 0);
});

Deno.test("Should return 0 if there are no increases", () => {
  assertEquals(countWindowedDepthIncreases([0, 0, 1, 0, 0, 0], 3), 0);
});
