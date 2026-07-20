/**
 * Invokes the given function and returns its result. This is a named
 * replacement for an immediately-invoked function expression (IIFE), making
 * expression-oriented blocks readable: `call(() => …)` communicates intent
 * where `(() => …)()` hides it in punctuation. See issue #1659.
 *
 * @template R - The type of the value returned by `fn`.
 * @param fn - The function to invoke.
 * @returns The value returned by `fn`.
 *
 * @example
 * const result = call(() => {
 *   if (user.role === 'admin') return 'full';
 *   if (user.role === 'editor') return 'partial';
 *   return 'none';
 * });
 */
export function call<R>(fn: () => R): R {
  return fn();
}

/**
 * Invokes the given async function and returns its resolved value, as a
 * Promise. This is the async counterpart of {@link call}, a named
 * replacement for the async IIFE `(async () => { … })()`. See issue #1659.
 *
 * @template R - The type of the value resolved by `fn`.
 * @param fn - The async function to invoke.
 * @returns A Promise that resolves to the value returned by `fn`.
 *
 * @example
 * const result = await callAsync(async () => {
 *   const perms = await fetchPerms(user.id);
 *   const roles = await fetchRoles(user.id);
 *   return merge(perms, roles);
 * });
 */
export async function callAsync<R>(fn: () => Promise<R>): Promise<R> {
  return await fn();
}
