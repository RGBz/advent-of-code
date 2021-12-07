import { bitStringToNumber } from "../bitStringToNumber.ts";
import { findCO2ScrubberRating, findOxygenGeneratorRating } from "./raters.ts";

const bitStrings = new TextDecoder("utf8").decode(
  Deno.readFileSync("src/2021/03/input.txt"),
)
  .split("\n");
const oxygenGeneratorRating = findOxygenGeneratorRating(bitStrings);
const co2ScrubberRating = findCO2ScrubberRating(bitStrings);

console.log(
  bitStringToNumber(oxygenGeneratorRating) *
    bitStringToNumber(co2ScrubberRating),
);
