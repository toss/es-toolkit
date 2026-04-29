function getNullishPriority(value: any): number {
  if (value === null) {
    return 1;
  }
  if (value === undefined) {
    return 2;
  }
  return 0;
}

export function compareValues(a: any, b: any, order: 'asc' | 'desc'): 0 | -1 | 1 {
  const isAsc = order === 'asc';
  const aPriority = getNullishPriority(a);
  const bPriority = getNullishPriority(b);

  if (aPriority !== bPriority) {
    return isAsc ? (aPriority > bPriority ? 1 : -1) : aPriority > bPriority ? -1 : 1;
  }

  if (aPriority !== 0) {
    return 0;
  }

  if (a < b) {
    return isAsc ? -1 : 1;
  }
  if (a > b) {
    return isAsc ? 1 : -1;
  }
  return 0;
}
