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

export function test({ input, parts, expected }: {
  input: string;
  parts: ((input: string) => number)[];
  expected: [number, number];
}) {
  for (let i = 0; i < parts.length; i++) {
    Deno.test(`${parts[i].name} should give the correct result for the example`, () => {
      assertEquals(parts[i](input), expected[i]);
    });
  }
}
