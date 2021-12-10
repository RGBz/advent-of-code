import { production, sum, test } from "../util.ts";

const day = 1;

export function part1(input: string): number {
  const depths = input.split("\n").map(Number);
  return depths.slice(1).reduce((state, depth) => {
    if (depth > state.last) {
      state.count += 1;
    }
    state.last = depth;
    return state;
  }, { last: depths.length ? depths[0] : 0, count: 0 }).count;
}

export function part2(input: string): number {
  const depths = input.split("\n").map(Number);
  const windowSize = 5;
  if (depths.length <= windowSize) {
    return 0;
  }
  let lastWindowSum = sum(depths.slice(0, windowSize), (t) => t);
  let count = 0;
  for (let i = 1; i < depths.length - (windowSize - 1); i++) {
    const currentWindowSum = sum(depths.slice(i, i + windowSize), (t) => t);
    if (currentWindowSum > lastWindowSum) {
      count += 1;
    }
    lastWindowSum = currentWindowSum;
  }
  return count;
}

production({ day, parts: [part1, part2] });

test({
  day,
  input: `199
200
208
210
200
207
240
269
260
263`,
  parts: [part1, part2],
  expected: [7, 5],
});
