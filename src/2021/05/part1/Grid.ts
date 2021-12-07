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
    if (sx === ex) {
      const min = Math.min(sy, ey);
      const max = Math.max(sy, ey);
      for (let y = min; y <= max; y++) {
        this.increment(sx, y);
      }
    }
    if (sy === ey) {
      const min = Math.min(sx, ex);
      const max = Math.max(sx, ex);
      for (let x = min; x <= max; x++) {
        this.increment(x, sy);
      }
    }
  }

  count(overlaps: number): number {
    return [...this.cells.values()].filter((count) => count >= overlaps).length;
  }
}
