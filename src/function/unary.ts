import { ary } from './ary.ts';

/**
 * Creates a function that accepts up to one argument, ignoring any additional arguments.
 *
 * @template F - The type of the function.
 * @param {F} func - The function to cap arguments for.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new capped function.
 */
export const unary = <F extends (...args: any[]) => any>(func: F): ((...args: any[]) => ReturnType<F>) => {
  return ary(func, 1);
};
