/**
 * @name delay
 * Pause the execution of a function for given milliseconds.
 * @param ms The amount of time to delay the function.
 */
export function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}