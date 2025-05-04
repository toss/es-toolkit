function getPriority(a: unknown): 0 | 1 | 2 | 3 | 4 {
  if (typeof a === 'symbol') {
    return 1;
  }

  if (a === null) {
    return 2;
  }

  if (a === undefined) {
    return 3;
  }

  if (a !== a) {
    return 4;
  }

  return 0;
}

export const compareValues = <V>(a: V, b: V, order: string) => {
  if (a !== b) {
    const aPriority = getPriority(a);
    const bPriority = getPriority(b);

    // If both values are of the same priority and are normal values, compare them.
    if (aPriority === bPriority && aPriority === 0) {
      if (a < b) {
        return order === 'desc' ? 1 : -1;
      }

      if (a > b) {
        return order === 'desc' ? -1 : 1;
      }
    }

    return order === 'desc' ? bPriority - aPriority : aPriority - bPriority;
  }

  return 0;
};
