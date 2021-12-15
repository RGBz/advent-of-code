import { lines, run } from "../util.ts";

type PairInsertionRules = Map<string, string>;
type PairCounts = Map<string, number>;

class Polymer {
  #template: string;
  #pairs: PairCounts;
  #rules: PairInsertionRules;

  static fromString(input: string): Polymer {
    const [template, _, ...ruleStrings] = lines(input);
    return new Polymer(
      template,
      ruleStrings.reduce((map, str) => {
        const [pair, element] = str.split(" -> ");
        return map.set(pair, element);
      }, new Map()),
    );
  }

  constructor(template: string, rules: PairInsertionRules) {
    this.#template = template;
    this.#rules = rules;
    this.#pairs = new Map();
    for (let i = 0; i < this.#template.length - 1; i++) {
      const pair = this.#template[i] + this.#template[i + 1];
      this.#pairs.set(pair, (this.#pairs.get(pair) || 0) + 1);
    }
  }

  get elementCounts(): Map<string, number> {
    return [...this.#pairs.entries()].reduce(
      (map, [pair, count]) => map.set(pair[0], (map.get(pair[0]) || 0) + count),
      new Map([[this.#template[this.#template.length - 1], 1]]),
    );
  }

  get differenceBetweenMinAndMaxElementCounts(): number {
    const counts = [...this.elementCounts.values()];
    return Math.max(...counts) - Math.min(...counts);
  }

  iterate(count: number): this {
    for (let i = 0; i < count; i++) {
      const newPairs: PairCounts = new Map();
      for (const [pair, count] of this.#pairs.entries()) {
        const insertion = this.#rules.get(pair);
        if (insertion) {
          const [a, b] = pair.split("");
          const pairA = a + insertion;
          const pairB = insertion + b;
          newPairs.set(pairA, (newPairs.get(pairA) || 0) + count);
          newPairs.set(pairB, (newPairs.get(pairB) || 0) + count);
        }
      }
      this.#pairs = newPairs;
    }
    return this;
  }
}

run({
  day: 14,
  input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
  parts: [10, 40].map((iterations) =>
    (input) =>
      Polymer.fromString(input).iterate(iterations)
        .differenceBetweenMinAndMaxElementCounts
  ),
  expected: [1588, 2188189693529],
});
