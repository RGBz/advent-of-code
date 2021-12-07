import { assertEquals } from "testing/asserts.ts";
import { bitStringToNumber } from "../bitStringToNumber.ts";
import { findCO2ScrubberRating, findOxygenGeneratorRating } from "./raters.ts";

Deno.test("Should give the correct result for the example", () => {
  const input = [
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
  ];
  const oxygenGeneratorRating = findOxygenGeneratorRating(input);
  const co2ScrubberRating = findCO2ScrubberRating(input);
  assertEquals(oxygenGeneratorRating, "10111");
  assertEquals(bitStringToNumber(oxygenGeneratorRating), 23);
  assertEquals(co2ScrubberRating, "01010");
  assertEquals(bitStringToNumber(co2ScrubberRating), 10);
  assertEquals(
    bitStringToNumber(oxygenGeneratorRating) *
      bitStringToNumber(co2ScrubberRating),
    230,
  );
});
