import { assertEquals } from "testing/asserts.ts";

export function readInput(day: number): string {
  return new TextDecoder("utf8").decode(
    Deno.readFileSync(`src/2021/${String(day).padStart(2, "0")}/input.txt`),
  );
}

export function lines(input: string): string[] {
  return input.split("\n");
}

export function sum<T>(array: T[], fn: (t: T, i?: number) => number): number {
  return array.reduce((sum, elem, i) => sum + fn(elem, i), 0);
}

export function product<T>(
  array: T[],
  fn: (t: T, i?: number) => number,
): number {
  return array.reduce((product, elem, i) => product * fn(elem, i), 1);
}

export function sort(array: number[]): number[] {
  return array.sort((a, b) => a - b);
}

export function run(params: {
  day: number;
  input: string;
  parts: ((input: string) => number)[];
  expected: [number, number];
}) {
  return Deno.env.get("ENV") === "test" ? test(params) : production(params);
}

function production({ day, parts }: {
  day: number;
  parts: ((input: string) => number)[];
}) {
  for (let i = 0; i < parts.length; i++) {
    console.log(`PART${i + 1}`, parts[i](readInput(day)));
  }
}

function test({ day, input, parts, expected }: {
  day: number;
  input: string;
  parts: ((input: string) => number)[];
  expected: [number, number];
}) {
  if (Deno.env.get("ENV") !== "test") {
    return;
  }
  for (let i = 0; i < parts.length; i++) {
    try {
      assertEquals(parts[i](input), expected[i]);
      console.log(
        `${String(day).padStart(2, "0")}: PART${
          i + 1
        } should give the correct result for the example: ✅`,
      );
    } catch (err) {
      console.error(
        `${String(day).padStart(2, "0")}: PART${
          i + 1
        } should give the correct result for the example:`,
      );
      throw err;
    }
  }
}

interface GridCell {
  x: number;
  y: number;
  value: number;
}

export class Grid {
  readonly #cells: number[];
  readonly width: number;
  readonly height: number;

  static fromString(input: string): Grid {
    const rows = lines(input);
    return new Grid(
      rows.map((row) => row.split("")).flat().map(Number),
      rows[0].length,
      rows.length,
    );
  }

  constructor(cells: number[], width: number, height: number) {
    this.#cells = cells;
    this.width = width;
    this.height = height;
  }

  private *cellIterator(): Iterable<GridCell> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const value = this.get(x, y);
        if (value !== null) {
          yield { x, y, value };
        }
      }
    }
  }

  get cells(): Iterable<GridCell> {
    return this.cellIterator();
  }

  *getAdjacent(x: number, y: number): Iterable<GridCell> {
    for (let ay = Math.max(y - 1, 0); ay < Math.min(y + 2, this.height); ay++) {
      for (
        let ax = Math.max(x - 1, 0);
        ax < Math.min(x + 2, this.width);
        ax++
      ) {
        if (ax === x && ay === y) {
          continue;
        }
        const value = this.get(ax, ay);
        if (value) {
          yield { x: ax, y: ay, value };
        }
      }
    }
  }

  *filter(fn: ({ x, y, value }: GridCell) => boolean): Iterable<GridCell> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const value = this.get(x, y);
        if (value !== null) {
          const cell = { x, y, value };
          if (fn(cell)) {
            yield cell;
          }
        }
      }
    }
  }

  get(x: number, y: number): number | null {
    const index = this.getIndex(x, y);
    return index !== null ? this.#cells[index] : null;
  }

  getIndex(x: number, y: number): number | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return null;
    }
    return y * this.height + x;
  }

  set(x: number, y: number, value: number): void {
    const index = this.getIndex(x, y);
    if (index !== null) {
      this.#cells[index] = value;
    }
  }

  clone(): Grid {
    return new Grid(
      [...this.#cells],
      this.width,
      this.height,
    );
  }

  toString(): string {
    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        str += this.get(x, y)?.toString(16);
      }
      str += "\n";
    }
    return str;
  }
}
