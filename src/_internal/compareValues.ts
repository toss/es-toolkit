// Weight used to push `Symbol`, `NaN`, `null` and `undefined` after other values when sorting,
// in the order `Symbol` < `NaN` < `null` < `undefined`.
// Symbols are ranked here because comparing them with `<` throws a `TypeError`.
function nullishRank(value: any): number {
  if (typeof value === 'symbol') {
    return 1;
  }
  if (Number.isNaN(value)) {
    return 2;
  }
  if (value === null) {
    return 3;
  }
  if (value === undefined) {
    return 4;
  }
  return 0;
}

function compareAscending(a: any, b: any): 0 | -1 | 1 {
  const aRank = nullishRank(a);
  const bRank = nullishRank(b);

  // Compare by rank first: regular value (0) < Symbol (1) < NaN (2) < null (3) < undefined (4).
  if (aRank < bRank) {
    return -1;
  }
  if (aRank > bRank) {
    return 1;
  }
  if (aRank !== 0) {
    return 0; // Both are the same kind of special value.
  }

  // Both are regular values.
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function compareValues(a: any, b: any, order: 'asc' | 'desc'): 0 | -1 | 1 {
  // Descending order is the ascending comparison with the operands swapped.
  return order === 'asc' ? compareAscending(a, b) : compareAscending(b, a);
}
