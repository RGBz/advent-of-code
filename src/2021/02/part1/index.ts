import { Submarine } from "./Submarine.ts";
import { SubmarineCommand } from "./SubmarineCommand.ts";

const sub = new Submarine();

sub.executeCommands(
  ...new TextDecoder("utf8").decode(
    Deno.readFileSync("src/2021/02/input.txt"),
  )
    .split("\n").map((line) => {
      const [type, amountRaw] = line.split(" ");
      return { type, amount: Number(amountRaw) } as SubmarineCommand;
    }),
);

console.log(sub.horizontalTimesDepth);
