import { BingoSystem } from "./BingoSystem.ts";

console.log(BingoSystem.run(new TextDecoder("utf8").decode(
  Deno.readFileSync("src/2021/04/input.txt"),
)));
