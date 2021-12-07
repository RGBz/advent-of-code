export function findGamma(bitStrings: string[]): string {
  if (bitStrings.length === 0) {
    return "";
  }
  const oneCounts = new Array(bitStrings[0].length).fill(0);
  for (const bitString of bitStrings) {
    for (let i = 0; i < bitString.length; i++) {
      if (bitString.charAt(i) === "1") {
        oneCounts[i] += 1;
      }
    }
  }
  return oneCounts.map((count) => count < bitStrings.length / 2 ? 0 : 1).join(
    "",
  );
}
