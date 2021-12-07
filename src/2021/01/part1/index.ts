import { countDepthIncreases } from "./countDepthIncreases.ts";

console.log(
  countDepthIncreases(
    new TextDecoder("utf8").decode(
      Deno.readFileSync("src/2021/01/part1/input.txt"),
    )
      .split("\n").map(Number),
  ),
);
