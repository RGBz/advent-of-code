export function run(input: string, generations: number): number {
  const fishAges = input.split(",").map(Number);
  let currentGeneration = new Array(9).fill(0).map((_, index) =>
    fishAges.filter((age) => age === index).length
  );
  for (let i = 0; i < generations; i++) {
    currentGeneration = tick(currentGeneration);
  }
  return currentGeneration.reduce((sum, count) => sum + count, 0);
}

export function tick(daysTillSpawn: number[]): number[] {
  const spawnCount = daysTillSpawn[0];
  const nextGeneration = [...daysTillSpawn.slice(1), spawnCount];
  nextGeneration[6] += spawnCount;
  return nextGeneration;
}
