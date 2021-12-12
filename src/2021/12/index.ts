import { lines, run, sum } from "../util.ts";

function process(input: string, canVisitASmallCaveTwice: boolean): number {
  const edges = lines(input).map((str) => str.split("-")).reduce(
    (map, [a, b]) =>
      map.set(a, (map.get(a) || []).concat(b)).set(
        b,
        (map.get(b) || []).concat(a),
      ),
    new Map<string, string[]>(),
  );
  const explore = (
    path: string[],
    visitedASmallCaveTwiceAlready: boolean,
  ): number =>
    path[path.length - 1] === "end" ? 1 : sum(
      edges.get(path[path.length - 1])?.filter((b) =>
        b !== "start" &&
        (b.toUpperCase() === b || !visitedASmallCaveTwiceAlready ||
          !path.includes(b))
      ) || [],
      (b) =>
        explore(
          [...path, b],
          visitedASmallCaveTwiceAlready ||
            (b.toLowerCase() === b &&
              path.includes(b)),
        ),
    );
  return explore(["start"], !canVisitASmallCaveTwice);
}

run({
  day: 12,
  input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
  parts: [false, true].map((canVisitASmallCaveTwice) =>
    (input) => process(input, canVisitASmallCaveTwice)
  ),
  expected: [19, 103],
});
