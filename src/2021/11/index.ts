import { lines, product, readInput, sum } from "../util.ts";

export function part1(input: string): number {
  return sum(lines(input), (l) => l.length);
}

export function part2(input: string): number {
  return product(lines(input), (l) => l.length);
}

if (Deno.env.get("ENV") === "production") {
  for (const part of [part1, part2]) {
    console.log(part.name, part(readInput(11)));
  }
}
