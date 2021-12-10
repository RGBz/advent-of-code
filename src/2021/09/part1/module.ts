interface DepthMap {
  readings: number[];
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

export function run(input: string): number {
  const map = stringToDepthMap(input);
  return findLowPoints(map).reduce(
    (sum, { x, y }) => sum + getReading(map, x, y) + 1,
    0,
  );
}

function stringToDepthMap(str: string): DepthMap {
  const rows = str.split("\n").map((row) => row.trim());
  const readings = rows.map((row) => row.split("")).flat().map(Number);
  const height = rows.length;
  const width = rows[0].length;
  return {
    readings,
    width,
    height,
  };
}

function findLowPoints(map: DepthMap): Point[] {
  const lowPoints = [];
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (isLowPoint(map, x, y)) {
        lowPoints.push({ x, y });
      }
    }
  }
  return lowPoints;
}

function isLowPoint(map: DepthMap, x: number, y: number): boolean {
  const self = getReading(map, x, y);
  const above = getReading(map, x, y - 1);
  const below = getReading(map, x, y + 1);
  const left = getReading(map, x - 1, y);
  const right = getReading(map, x + 1, y);
  const isLow = above > self &&
    below > self &&
    left > self &&
    right > self;
  return isLow;
}

function getReading(map: DepthMap, x: number, y: number): number {
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    return Number.MAX_SAFE_INTEGER;
  }
  return map.readings[map.width * y + x];
}
