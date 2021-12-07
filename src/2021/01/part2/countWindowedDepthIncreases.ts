import { sumWindow } from "./sumWindow.ts";

export function countWindowedDepthIncreases(
  depths: number[],
  windowSize = 3,
): number {
  if (depths.length <= windowSize) {
    return 0;
  }
  let lastWindowSum = sumWindow(depths, 0, windowSize);
  let count = 0;
  for (let i = 1; i < depths.length - (windowSize - 1); i++) {
    const currentWindowSum = sumWindow(depths, i, i + windowSize);
    if (currentWindowSum > lastWindowSum) {
      count += 1;
    }
    lastWindowSum = currentWindowSum;
  }
  return count;
}
