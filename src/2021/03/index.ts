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
  const bitStrings = lines(input);
  let oxygenRating = "", co2Rating = "";
  let ofilter = mostCommonBit(bitStrings, 0);
  let cfilter = leastCommonBit(bitStrings, 0);
  for (let i = 1; i < bitStrings[0].length + 1; i++) {
    const otoConsider = bitStrings.filter((str) => str.startsWith(ofilter));
    const ctoConsider = bitStrings.filter((str) => str.startsWith(cfilter));
    if (otoConsider.length === 1) {
      oxygenRating = otoConsider[0];
    }
    if (ctoConsider.length === 1) {
      co2Rating = ctoConsider[0];
    }
    ofilter += mostCommonBit(otoConsider, i);
    cfilter += leastCommonBit(ctoConsider, i);
  }
  return product([oxygenRating, co2Rating], (s) => Number.parseInt(s, 2));
}

function mostCommonBit(bitStrings: string[], index: number): "0" | "1" {
  return bitStrings.reduce(
      (onesCount, bitString) => onesCount + (bitString[index] === "1" ? 1 : 0),
      0,
    ) < bitStrings.length / 2
    ? "0"
    : "1";
}

function leastCommonBit(bitStrings: string[], index: number): "0" | "1" {
  return mostCommonBit(bitStrings, index) === "0" ? "1" : "0";
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
