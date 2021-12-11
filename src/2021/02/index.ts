import { lines, run } from "../util.ts";

export function part1(input: string): number {
  let horizontal = 0, depth = 0;
  for (const line of lines(input)) {
    const [command, amount] = line.split(" ");
    switch (command) {
      case "forward":
        horizontal += Number(amount);
        break;
      case "up":
        depth -= Number(amount);
        break;
      case "down":
        depth += Number(amount);
        break;
    }
  }
  return horizontal * depth;
}

export function part2(input: string): number {
  let horizontal = 0, depth = 0, aim = 0;
  for (const line of lines(input)) {
    const [command, amount] = line.split(" ");
    switch (command) {
      case "forward":
        horizontal += Number(amount);
        depth += aim * Number(amount);
        break;
      case "up":
        aim -= Number(amount);
        break;
      case "down":
        aim += Number(amount);
        break;
    }
  }
  return horizontal * depth;
}

run({
  day: 2,
  input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
  parts: [part1, part2],
  expected: [150, 900],
});
