import { Grid, lines, product, run } from "../util.ts";


export function part1(input: string): number {
  let flashes = 0;
  const grid = Grid.fromString(input);
  for (let step = 1; step <= 100; step++) {
    // Increment each cell by 1
    for (const { x, y, value } of grid.cells) {
      grid.set(x, y, value + 1);
    }
    // Tackle the flashing
    let flashed = [...grid.filter(({ value }) => value > 9)];
    const flashedThisStep = new Set(flashed.map(({ x, y }) => `${x},${y}`));
    while(flashed.length) {
      flashes += flashed.length;
      const nextFlashed = [];
      for (const f of flashed) {
        for (const a of grid.getAdjacent(f.x, f.y)) {
          if (a.value >= 9 && !flashedThisStep.has(`${a.x},${a.y}`)) {
            flashedThisStep.add(`${a.x},${a.y}`);
            nextFlashed.push(a);
          }
          grid.set(a.x, a.y, a.value += 1);
        }
      }
      flashed = nextFlashed;
    }
    // 0 out any octopuses that flashed
    for (const { x, y } of grid.filter(({ value }) => value > 9)) {
      grid.set(x, y, 0);
    }
  }
  return flashes;
}

export function part2(input: string): number {
  const grid = Grid.fromString(input);
  for (let step = 1; step <= 1000; step++) {
    // Increment each cell by 1
    for (const { x, y, value } of grid.cells) {
      grid.set(x, y, value + 1);
    }
    // Tackle the flashing
    let flashed = [...grid.filter(({ value }) => value > 9)];
    const flashedThisStep = new Set(flashed.map(({ x, y }) => `${x},${y}`));
    while(flashed.length) {
      const nextFlashed = [];
      for (const f of flashed) {
        for (const a of grid.getAdjacent(f.x, f.y)) {
          if (a.value >= 9 && !flashedThisStep.has(`${a.x},${a.y}`)) {
            flashedThisStep.add(`${a.x},${a.y}`);
            nextFlashed.push(a);
          }
          grid.set(a.x, a.y, a.value += 1);
        }
      }
      flashed = nextFlashed;
    }
    if (flashedThisStep.size === grid.width * grid.height) {
      return step;
    }
    // 0 out any octopuses that flashed
    for (const { x, y } of grid.filter(({ value }) => value > 9)) {
      grid.set(x, y, 0);
    }
  }
  return -1;
}

run({
  day: 11,
  input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
  parts: [part1, part2],
  expected: [1656, 195],
});
