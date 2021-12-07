import { run } from "./module.ts";

console.log(run(
  new TextDecoder("utf8").decode(
    Deno.readFileSync("src/2021/06/input.txt"),
  ),
  256,
));
