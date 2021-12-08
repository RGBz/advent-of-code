export function run(input: string): number {
  const positions = input.split(",").map(Number);
  return findCheapestPosition(positions);
}

function findCheapestPosition(positions: number[]): number {
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const cheapest = { cost: Number.MAX_SAFE_INTEGER, position: 0 };
  for (let position = min; position <= max; position++) {
    const cost = pricePosition(positions, position);
    if (cost < cheapest.cost) {
      cheapest.cost = cost;
      cheapest.position = position;
    }
  }
  return cheapest.cost;
}

function pricePosition(positions: number[], target: number): number {
  return positions.reduce(
    (sum, p) => sum + priceDistance(Math.abs(p - target)),
    0,
  );
}

function priceDistance(distance: number): number {
  return (distance + Math.pow(distance, 2)) / 2;
}
