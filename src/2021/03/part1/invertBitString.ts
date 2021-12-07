export function invertBitString(bitString: string): string {
  return bitString.split("").map((symbol) => symbol === "0" ? "1" : "0").join(
    "",
  );
}
