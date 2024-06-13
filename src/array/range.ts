/**
 *  Returns an array of numbers from start to end with the specified step value.
 *
 * This function takes a start number, an end number, and an optional step value, and returns an array of numbers from start to end with the specified step value.
 *
 *
 * @param start
 * @param end
 * @param step
 * @returns
 */

export function range(start: number, end?: number, step?: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (step === undefined) {
    step = start <= end ? 1 : -1;
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  } else {
    return Array(Math.abs(end - start)).fill(start);
  }

  return result;
}
