import { assertEquals } from "testing/asserts.ts";

export function readInput(day: number): string {
  return new TextDecoder("utf8").decode(
    Deno.readFileSync(`src/2021/${String(day).padStart(2, "0")}/input.txt`),
  );
}

export function lines(input: string): string[] {
  return input.split("\n");
}

export function sum<T>(array: T[], fn: (t: T, i?: number) => number): number {
  return array.reduce((sum, elem, i) => sum + fn(elem, i), 0);
}

export function product<T>(
  array: T[],
  fn: (t: T, i?: number) => number,
): number {
  return array.reduce((product, elem, i) => product * fn(elem, i), 1);
}

export function sort(array: number[]): number[] {
  return array.sort((a, b) => a - b);
}

export function production({ day, parts }: {
  day: number;
  parts: ((input: string) => number)[];
}) {
  if (Deno.env.get("ENV") !== "production") {
    return;
  }
  for (const part of parts) {
    console.log(part.name, part(readInput(day)));
  }
}

export function test({ day, input, parts, expected }: {
  day: number;
  input: string;
  parts: ((input: string) => number)[];
  expected: [number, number];
}) {
  if (Deno.env.get("ENV") !== "test") {
    return;
  }
  for (let i = 0; i < parts.length; i++) {
    try {
      assertEquals(parts[i](input), expected[i]);
      console.log(
        `${String(day).padStart(2, "0")}: ${
          parts[i].name
        } should give the correct result for the example: ✅`,
      );
    } catch (err) {
      console.error(
        `${String(day).padStart(2, "0")}: ${
          parts[i].name
        } should give the correct result for the example:`,
      );
      throw err;
    }
  }
}
