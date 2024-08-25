import { spread as spreadToolkit } from '../../function/spread.ts';

/**
 * Creates a function that invokes `func` with the `this` binding of the create function and an array of arguments much like `Function#apply`.
 *
 * @template F The type of the function to spread arguments over.
 * @param {F} func The function to spread arguments over.
 * @param {number} startIndex The start position of the spread.
 * @returns {(...args: any[]) => ReturnType<F>} A new function that invokes `func` with the spread arguments.
 */
export function spread<F extends (...args: any[]) => any>(
  func: F,
  startIndex: number = 0
): (...args: any[]) => ReturnType<F> {
  startIndex = Number.parseInt(startIndex as any, 10);

  if (Number.isNaN(startIndex) || startIndex < 0) {
    startIndex = 0;
  }

  return spreadToolkit(func, startIndex);
}
