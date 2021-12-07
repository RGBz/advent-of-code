type Vector = [number, number];

export class Grid {
  cells: Map<string, number> = new Map();

  static run(input: string): number {
    const grid = new Grid();
    for (const row of input.split("\n")) {
      const [start, end] = row.split(" -> ").map((vec) =>
        vec.split(",").map(Number)
      );
      grid.traverse(start as Vector, end as Vector);
    }
    return grid.count(2);
  }

  getCount(x: number, y: number): number {
    return this.cells.get(`${x},${y}`) || 0;
  }

  increment(x: number, y: number): void {
    this.cells.set(`${x},${y}`, this.getCount(x, y) + 1);
  }

  traverse([sx, sy]: Vector, [ex, ey]: Vector): void {
    let x = sx;
    let y = sy;
    do {
      this.increment(x, y);
      x += x === ex ? 0 : x < ex ? 1 : -1;
      y += y === ey ? 0 : y < ey ? 1 : -1;
    } while (!(x === ex && y === ey));
    this.increment(x, y);
  }

  count(overlaps: number): number {
    return [...this.cells.values()].filter((count) => count >= overlaps).length;
  }

  toString(): string {
    let str = "";
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const value = this.getCount(x, y);
        if (value) {
          str += value;
        } else {
          str += ".";
        }
      }
      str += "\n";
    }
    return str;
  }
}
