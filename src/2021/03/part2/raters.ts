export function findOxygenGeneratorRating(bitStrings: string[]): string {
  let filter = mostCommonBit(bitStrings, 0);
  for (let i = 1; i < bitStrings[0].length + 1; i++) {
    const toConsider = filterStrings(bitStrings, filter);
    if (toConsider.length === 1) {
      return toConsider[0];
    }
    filter += mostCommonBit(toConsider, i);
  }
  return "";
}

export function findCO2ScrubberRating(bitStrings: string[]): string {
  let filter = leastCommonBit(bitStrings, 0);
  for (let i = 1; i < bitStrings[0].length + 1; i++) {
    const toConsider = filterStrings(bitStrings, filter);
    if (toConsider.length === 1) {
      return toConsider[0];
    }
    filter += leastCommonBit(toConsider, i);
  }
  return "";
}

export function filterStrings(bitStrings: string[], filter: string): string[] {
  return bitStrings.filter((str) => str.startsWith(filter));
}

export function mostCommonBit(bitStrings: string[], index: number): "0" | "1" {
  return bitStrings.reduce(
      (onesCount, bitString) => onesCount + (bitString[index] === "1" ? 1 : 0),
      0,
    ) < bitStrings.length / 2
    ? "0"
    : "1";
}

export function leastCommonBit(bitStrings: string[], index: number): "0" | "1" {
  return mostCommonBit(bitStrings, index) === "0" ? "1" : "0";
}
