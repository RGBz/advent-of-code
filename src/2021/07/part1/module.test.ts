import { assertEquals } from "testing/asserts.ts";
import { run } from "./module.ts";

Deno.test("Should give the correct result for the example", () => {
  assertEquals(
    run("16,1,2,0,4,2,7,1,2,14"),
    37,
  );
});
