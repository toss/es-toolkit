/**
 * Attempt to execute an async function and return the result or error.
 * Returns a Promise that resolves to a tuple where:
 * - On success: [null, Result] - First element is null, second is the result
 * - On error: [Error, null] - First element is the caught error, second is null
 *
 * @template {unknown} AttemptResult - The type of the result of the async function.
 * @template {unknown} AttemptError - The type of the error that can be thrown by the async function.
 * @param {() => Promise<AttemptResult>} func - The async function to execute.
 * @returns {Promise<[null, AttemptResult] | [AttemptError, null]>} A Promise that resolves to a tuple containing either [null, result] or [error, null].
 *
 * @example
 * // Successful execution
 * const [error, data] = await attemptAsync(async () => {
 *   const response = await fetch('https://api.example.com/data');
 *   return response.json();
 * });
 * // If successful: [null, { ... data ... }]
 *
 * // Failed execution
 * const [error, data] = await attemptAsync(async () => {
 *   throw new Error('Network error');
 * });
 * // [Error, null]
 *
 * // With type parameter
 * const [error, users] = await attemptAsync<User[]>(async () => {
 *   const response = await fetch('https://api.example.com/users');
 *   return response.json();
 * });
 * // users is typed as User[]
 */
export async function attemptAsync<AttemptResult, AttemptError>(
  func: () => Promise<AttemptResult>
): Promise<[null, AttemptResult] | [AttemptError, null]> {
  try {
    const result = await func();
    return [null, result];
  } catch (error) {
    return [error as AttemptError, null];
  }
}
