export function setToEntries(set: Set<any>) {
  const arr = new Array(set.size);
  const values = set.values();

  for (let i = 0; i < arr.length; i++) {
    const value = values.next().value;
    arr[i] = [value, value];
  }
  return arr;
}
