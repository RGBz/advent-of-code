import { assertEquals } from "testing/asserts.ts";
import { LanternfishSystem } from "./module.ts";

Deno.test("Should give the correct result for the example", () => {
  assertEquals(
    LanternfishSystem.run(`3,4,3,1,2`, 18),
    26,
  );
});
