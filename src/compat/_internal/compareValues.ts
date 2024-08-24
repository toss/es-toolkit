export const compareValues = <V>(a: V, b: V, order: string) => {
  if ((a != null && b == null) || a < b) {
    return order === 'desc' ? 1 : -1;
  }

  if ((a == null && b != null) || a > b) {
    return order === 'desc' ? -1 : 1;
  }

  return 0;
};
