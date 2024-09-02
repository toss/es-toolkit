import { ary as aryToolkit } from '../../function/ary.ts';

/**
 * Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
 *
 * @template F - The type of the function.
 * @param func - The function to cap arguments for.
 * @param n - The arity cap.
 * @param guard - The value to guard the arity cap.
 * @returns Returns the new capped function.
 */
export function ary<F extends (...args: any[]) => any>(
  func: F,
  n: number = func.length,
  guard?: unknown
): (...args: any[]) => ReturnType<F> {
  if (guard) {
    n = func.length;
  }

  if (Number.isNaN(n) || n < 0) {
    n = 0;
  }

  return aryToolkit(func, n);
}
