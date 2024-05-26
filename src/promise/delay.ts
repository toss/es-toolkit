/**
 * Delays the execution of code for a specified number of milliseconds.
 * 
 * This function returns a Promise that resolves after the specified delay, allowing you to use it 
 * with async/await to pause execution.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 *
 * @example
 * async function foo() {
 *   console.log('Start');
 *   await delay(1000); // Delays execution for 1 second
 *   console.log('End');
 * }
 * 
 * foo();
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
