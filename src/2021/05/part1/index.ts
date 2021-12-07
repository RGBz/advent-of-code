import { Grid } from "./Grid.ts";

console.log(Grid.run(new TextDecoder("utf8").decode(
  Deno.readFileSync("src/2021/05/input.txt"),
)));
