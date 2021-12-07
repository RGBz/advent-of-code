import { assertEquals } from "testing/asserts.ts";
import { bitStringToNumber } from "../bitStringToNumber.ts";
import { findGamma } from "./findGamma.ts";
import { invertBitString } from "./invertBitString.ts";

Deno.test("Should give the correct result for the example", () => {
  const gamma = findGamma([
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ]);
  const epsilon = invertBitString(gamma);
  assertEquals(gamma, "10110");
  assertEquals(bitStringToNumber(gamma), 22);
  assertEquals(epsilon, "01001");
  assertEquals(bitStringToNumber(epsilon), 9);
  assertEquals(bitStringToNumber(gamma) * bitStringToNumber(epsilon), 198);
});
