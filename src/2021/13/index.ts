import { lines, run } from "../util.ts";

function part1(input: string): number {
  const [dotLines, foldLines] = input.split("\n\n").map(lines);
  const sheet = new Sheet(dotLines.map((d) => {
    const [x, y] = d.split(",").map(Number);
    return [x, y];
  }));
  const [axis, position] = foldLines.map(
    (line) => [line.includes("x") ? 0 : 1, Number(line.split("=")[1])],
  )[0];
  sheet.fold(axis, position);
  return sheet.dotCount;
}

function part2(input: string): number {
  const [dotLines, foldLines] = input.split("\n\n").map(lines);
  const sheet = new Sheet(dotLines.map((d) => {
    const [x, y] = d.split(",").map(Number);
    return [x, y];
  }));
  for (const line of foldLines) {
    sheet.fold(line.includes("x") ? 0 : 1, Number(line.split("=")[1]));
  }
  console.log(sheet.toString());
  return 0;
}

type Dot = [number, number];

class Sheet {
  #dots: Dot[];
  width: number;
  height: number;

  constructor(dots: Dot[]) {
    this.#dots = dots;
    this.width = Math.max(...dots.map((d) => d[0]));
    this.height = Math.max(...dots.map((d) => d[1]));
  }

  get dotCount(): number {
    return new Set(this.#dots.map(([x, y]) => `${x},${y}`)).size;
  }

  fold(axis: number, position: number): void {
    if (axis) {
      this.height = position;
    } else {
      this.width = position;
    }
    this.#dots = this.#dots.map(([x, y]) =>
      axis
        ? [x, y < position ? y : position - (y - position)]
        : [x < position ? x : position - (x - position), y]
    );
  }

  toString(): string {
    let str = "";
    for (let y = 0; y <= this.height; y++) {
      for (let x = 0; x <= this.width; x++) {
        str += this.#dots.some((d) => d[0] === x && d[1] === y) ? "#" : ".";
      }
      str += "\n";
    }
    return str;
  }
}

run({
  day: 13,
  input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`,
  parts: [part1, part2],
  expected: [17, 0],
});
