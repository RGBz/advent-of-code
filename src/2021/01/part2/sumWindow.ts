export function sumWindow(
  depths: number[],
  startIndex: number,
  endIndex: number,
): number {
  return depths.slice(startIndex, endIndex).reduce(
    (sum, depth) => sum + depth,
    0,
  );
}
