type SegmentLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g";

interface ScrambledToCorrectSegmentMap {
  a: SegmentLetter;
  b: SegmentLetter;
  c: SegmentLetter;
  d: SegmentLetter;
  e: SegmentLetter;
  f: SegmentLetter;
  g: SegmentLetter;
}

type DigitMapping = SegmentLetter[];

interface NotebookEntry {
  inputPatterns: DigitMapping[];
  outputPatterns: DigitMapping[];
}

const ONE_SEGMENT_COUNT = 2;
const FOUR_SEGMENT_COUNT = 4;
const SEVEN_SEGMENT_COUNT = 3;
const EIGHT_SEGMENT_COUNT = 7;

const DIGIT_BY_SEGMENT_LETTER = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

export function run(input: string): number {
  return input.split("\n").map(stringToNotebookEntry).reduce(
    (sum, entry) => sum + entryToOutputNumber(entry),
    0,
  );
}

function entryToOutputNumber(entry: NotebookEntry): number {
  const segmentMap = deduceSegmentMapping(entry);
  return Number(entry.outputPatterns.reduce(
    (str, outputPattern) => str + decodeDigitMapping(outputPattern, segmentMap),
    "",
  ));
}

function decodeDigitMapping(
  digitMapping: DigitMapping,
  segmentMap: ScrambledToCorrectSegmentMap,
): number {
  // go through each symbol and get the part of the segment
  return DIGIT_BY_SEGMENT_LETTER.indexOf(
    digitMapping.map((d) => segmentMap[d]).sort().join(""),
  );
}

function deduceSegmentMapping(
  entry: NotebookEntry,
): ScrambledToCorrectSegmentMap {
  const knownPatterns = getUniqueNumberPattern(entry);
  // top (a) is whatever is in 7 but not 1
  const a = difference(knownPatterns[7], knownPatterns[1])[0];
  // top left (b) is in 4, is not in 1 and appears in 6 of the input patterns
  const b = getSegmentLetterForDigitMappingAndInputOccurrenceCount(
    difference(knownPatterns[4], knownPatterns[1]),
    entry,
    6,
  );
  // top right (c) is in 1 and appears in 8 of the input patterns
  const c = getSegmentLetterForDigitMappingAndInputOccurrenceCount(
    knownPatterns[1],
    entry,
    8,
  );
  // middle (d) is whatever is left in 4
  const d = difference(knownPatterns[4], [b, ...knownPatterns[1]])[0];
  // bottom right (f) is whatever the other symbol in 1 is
  const f = difference(knownPatterns[1], [c])[0];
  // bottom (g) is whatever we haven't identified yet and appears in 7 of the input patterns
  const g = getSegmentLetterForDigitMappingAndInputOccurrenceCount(
    difference(knownPatterns[8], [a, ...knownPatterns[4]]),
    entry,
    7,
  );
  // bottom left (e) is whatever is left
  const e = difference(knownPatterns[8], [a, g, ...knownPatterns[4]])[0];
  return {
    [a]: "a",
    [b]: "b",
    [c]: "c",
    [d]: "d",
    [e]: "e",
    [f]: "f",
    [g]: "g",
  } as unknown as ScrambledToCorrectSegmentMap;
}

function getUniqueNumberPattern(
  entry: NotebookEntry,
): Record<number, DigitMapping> {
  return {
    1: getDigitMappingForSegmentCount(entry, ONE_SEGMENT_COUNT),
    4: getDigitMappingForSegmentCount(entry, FOUR_SEGMENT_COUNT),
    7: getDigitMappingForSegmentCount(entry, SEVEN_SEGMENT_COUNT),
    8: getDigitMappingForSegmentCount(entry, EIGHT_SEGMENT_COUNT),
  };
}

function getSegmentLetterForDigitMappingAndInputOccurrenceCount(
  mapping: DigitMapping,
  entry: NotebookEntry,
  inputOccurrenceCount: number,
): SegmentLetter {
  return mapping.find((letter) =>
    entry.inputPatterns.filter((p) => p.includes(letter)).length ===
      inputOccurrenceCount
  ) as SegmentLetter;
}

function getDigitMappingForSegmentCount(
  entry: NotebookEntry,
  segmentCount: number,
): DigitMapping {
  return entry.inputPatterns.find((p) =>
    p.length === segmentCount
  ) as DigitMapping;
}

function difference(long: DigitMapping, short: DigitMapping): SegmentLetter[] {
  return long.filter((l) => !short.includes(l));
}

function stringToNotebookEntry(str: string): NotebookEntry {
  const [input, output] = str.split(" | ");
  return {
    inputPatterns: input.split(" ").map((pattern) =>
      pattern.split("").sort() as DigitMapping
    ),
    outputPatterns: output.split(" ").map((pattern) =>
      pattern.split("").sort() as DigitMapping
    ),
  };
}
