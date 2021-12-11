import { lines, run, sort } from "../util.ts";

const PAIR: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const ENDS = Object.values(PAIR);

export function part1(input: string): number {
  const SCORE: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  let score = 0;
  const stack: string[] = [];
  for (const line of lines(input)) {
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (ENDS.includes(c)) {
        if (c === PAIR[stack[stack.length - 1]]) {
          stack.pop();
        } else {
          score += SCORE[c];
          break;
        }
      } else {
        stack.push(c);
      }
    }
  }
  return score;
}

export function part2(input: string): number {
  const SCORE: Record<string, number> = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const scores = [];
  for (const line of lines(input)) {
    let stack: string[] = [];
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (ENDS.includes(c)) {
        if (c === PAIR[stack[stack.length - 1]]) {
          stack.pop();
        } else {
          stack = [];
          break;
        }
      } else {
        stack.push(c);
      }
    }
    if (stack.length > 0) {
      let score = 0;
      while (stack.length > 0) {
        score *= 5;
        score += SCORE[PAIR[stack.pop() || ""]];
      }
      scores.push(score);
    }
  }
  return sort(scores)[Math.floor(scores.length / 2)];
}

run({
  day: 10,
  input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
  parts: [part1, part2],
  expected: [26397, 288957],
});
