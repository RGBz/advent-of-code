import { countWindowedDepthIncreases } from "./countWindowedDepthIncreases.ts";

console.log(
  countWindowedDepthIncreases(
    new TextDecoder("utf8").decode(
      Deno.readFileSync("src/2021/01/input.txt"),
    )
      .split("\n").map(Number),
  ),
);
