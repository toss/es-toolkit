export function compareValues(a: any, b: any, order: 'asc' | 'desc'): 0 | -1 | 1 {
  if (a < b) {
    return order === 'asc' ? -1 : 1;
  }
  if (a > b) {
    return order === 'asc' ? 1 : -1;
  }
  return 0;
}
