import { bitStringToNumber } from "../bitStringToNumber.ts";
import { findGamma } from "./findGamma.ts";
import { invertBitString } from "./invertBitString.ts";

const gamma = findGamma(
  new TextDecoder("utf8").decode(
    Deno.readFileSync("src/2021/03/input.txt"),
  )
    .split("\n"),
);
const epsilon = invertBitString(gamma);

console.log(bitStringToNumber(gamma) * bitStringToNumber(epsilon));
