import { lines, product, run, sum } from "../util.ts";

function part1(input: string): number {
  const gammaDigits = [];
  const numbers = lines(input);
  for (let i = 0; i < numbers[0].length; i++) {
    gammaDigits.push(
      sum(numbers, (n) => Number(n[i])) > numbers.length / 2 ? "1" : "0",
    );
  }
  const gamma = Number.parseInt(gammaDigits.join(""), 2);
  const epsilon = Number.parseInt(
    gammaDigits.map((d) => d === "1" ? "0" : "1").join(""),
    2,
  );
  return gamma * epsilon;
}

function part2(input: string): number {
  const mostCommonBit = (bitStrings: string[], index: number): "0" | "1" => {
    return bitStrings.reduce(
        (onesCount, bitString) =>
          onesCount + (bitString[index] === "1" ? 1 : 0),
        0,
      ) < bitStrings.length / 2
      ? "0"
      : "1";
  };

  const leastCommonBit = (bitStrings: string[], index: number): "0" | "1" => {
    return mostCommonBit(bitStrings, index) === "0" ? "1" : "0";
  };

  const bitStrings = lines(input);

  return product([mostCommonBit, leastCommonBit], (fn) => {
    let filter = "";
    for (let i = 0; i < bitStrings[0].length + 1; i++) {
      const toConsider = bitStrings.filter((str) => str.startsWith(filter));
      if (toConsider.length === 1) {
        return Number.parseInt(toConsider[0], 2);
      }
      filter += fn(toConsider, i);
    }
    return 0;
  });
}

run({
  day: 3,
  input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
  parts: [part1, part2],
  expected: [198, 230],
});
