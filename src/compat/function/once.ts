import { once as onceToolkit } from '../../function/once.ts';

/**
 * Creates a function that is restricted to invoking func once.
 *
 * @template T
 * @param {T} func The function to restrict.
 * @returns {T} Returns the new restricted function.
 */
export function once<T extends (...args: any) => any>(func: T): T {
  return onceToolkit(func);
}
