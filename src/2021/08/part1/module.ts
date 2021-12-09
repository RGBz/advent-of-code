export function run(input: string): number {
  return input.split("\n").map(lineToOutputPatterns)
    .reduce(
      (sum, entry) => sum + getUniqueDigitPatternCount(entry),
      0,
    );
}

function lineToOutputPatterns(line: string): string[] {
  return line.split(" | ")[1].split(" ");
}

function getUniqueDigitPatternCount(outputPatterns: string[]): number {
  return [2, 4, 3, 7].reduce(
    (sum, segmentCount) =>
      sum +
      outputPatterns.filter((p) => p.length === segmentCount).length,
    0,
  );
}
