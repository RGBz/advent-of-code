export function countDepthIncreases(depths: number[]): number {
  return depths.slice(1).reduce((state, depth) => {
    if (depth > state.last) {
      state.count += 1;
    }
    state.last = depth;
    return state;
  }, { last: depths.length ? depths[0] : 0, count: 0 }).count;
}
