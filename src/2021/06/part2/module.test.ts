import { assertEquals } from "testing/asserts.ts";
import { run } from "./module.ts";

Deno.test("Should give the correct result for the example", () => {
  assertEquals(
    run(`3,4,3,1,2`, 256),
    26984457539,
  );
});
