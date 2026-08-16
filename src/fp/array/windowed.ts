import { type WindowedOptions, windowed as windowedToolkit } from '../../array/windowed.ts';
import { combineEagerAndLazyFunctions, type Sink } from '../_internal/lazy.ts';

export type { WindowedOptions };

/**
 * Creates a function that returns sliding windows from an array.
 *
 * By default only full windows are returned. Pass partialWindows: true to include shorter
 * trailing windows. The full-window form is lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @param size - The size of each window. Must be a positive integer.
 * @param step - The step between window starts. Defaults to 1.
 * @param options - Window options.
 * @returns A function that maps a readonly array to sliding windows.
 * @throws {Error} When size or step is not a positive integer.
 *
 * @example
 * import { pipe, windowed } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3, 4], windowed(2));
 * // => [[1, 2], [2, 3], [3, 4]]
 */
export function windowed<T>(size: number, step?: number, options?: WindowedOptions): (array: readonly T[]) => T[][] {
  const resolvedStep = step ?? 1;
  const partialWindows = options?.partialWindows ?? false;

  function windowedEager(array: readonly T[]): T[][] {
    return windowedToolkit(array, size, step, options);
  }

  if (partialWindows || !Number.isInteger(size) || size <= 0 || !Number.isInteger(resolvedStep) || resolvedStep <= 0) {
    return windowedEager;
  }

  const windowedLazy = (emit: Sink<T[]>): Sink<T> => {
    const buffer: T[] = [];
    let index = 0;

    return (value: T): boolean => {
      buffer.push(value);

      if (buffer.length > size) {
        buffer.shift();
      }

      if (buffer.length === size) {
        const start = index - size + 1;

        if (start % resolvedStep === 0) {
          const shouldContinue = emit(buffer.slice());
          index++;
          return shouldContinue;
        }
      }

      index++;
      return true;
    };
  };

  return combineEagerAndLazyFunctions(windowedEager, windowedLazy);
}
