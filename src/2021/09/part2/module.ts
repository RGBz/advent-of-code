class DepthMap {
  readonly readings: number[];
  readonly width: number;
  readonly height: number;

  static fromString(str: string): DepthMap {
    const rows = str.split("\n").map((row) => row.trim());
    const readings = rows.map((row) => row.split("")).flat().map(Number);
    const height = rows.length;
    const width = rows[0].length;
    return new DepthMap(
      readings,
      width,
      height,
    );
  }

  constructor(readings: number[], width: number, height: number) {
    this.readings = readings;
    this.width = width;
    this.height = height;
  }

  get(x: number, y: number): number {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return Number.MAX_SAFE_INTEGER;
    }
    return this.readings[this.width * y + x];
  }
}

class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isAdjacent(other: Point): boolean {
    return (this.y === other.y &&
      (this.x - 1 === other.x || this.x + 1 === other.x)) ||
      (this.x === other.x &&
        (this.y - 1 === other.y || this.y + 1 === other.y));
  }

  toString(): string {
    return `${String(this.x).padStart(2, " ")},${
      String(this.y).padStart(2, " ")
    }`;
  }
}

class Basin {
  members: Set<Point>;

  constructor(members: Set<Point>) {
    this.members = members;
  }

  get size(): number {
    return this.members.size;
  }

  absorb(other: Basin) {
    for (const p of other.members) {
      this.members.add(p);
    }
  }

  isAdjacent(other: Basin): boolean {
    for (const a of this.members) {
      for (const b of other.members) {
        if (a.isAdjacent(b)) {
          return true;
        }
      }
    }
    return false;
  }

  toString(): string {
    return [...this.members].map((p) => p.toString()).join(" - ");
  }
}

class BasinManager {
  basins: Basin[] = [];

  add(basin: Basin) {
    this.basins.push(basin);
  }

  getLargest(count: number): Basin[] {
    return [...this.basins].sort((a, b) => b.size - a.size).slice(0, count);
  }

  merge(): void {
    for (let i = 0; i < this.basins.length - 1; i++) {
      for (let j = i + 1; j < this.basins.length; j++) {
        if (this.basins[i].isAdjacent(this.basins[j])) {
          const [absorbed] = this.basins.splice(j, 1);
          this.basins[i].absorb(absorbed);
          j = i;
        }
      }
    }
  }

  toString(): string {
    return this.basins.map((b) => b.toString()).join("\n");
  }
}

export function run(input: string): number {
  const map = DepthMap.fromString(input);
  return findBasins(map).getLargest(3).reduce(
    (product, basin) => product * basin.size,
    1,
  );
}

function findBasins(map: DepthMap): BasinManager {
  const manager = new BasinManager();
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (map.get(x, y) !== 9) {
        manager.add(new Basin(new Set([new Point(x, y)])));
      }
    }
  }
  manager.merge();
  return manager;
}
