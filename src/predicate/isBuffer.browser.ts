/**
 * Browser-safe stub for isBuffer that always returns false
 *
 * In browser environments, Node.js Buffer is not available.
 *
 * Checking Buffer availability at runtime with `typeof Buffer === 'undefined'`
 * would result in a ~28KB Buffer polyfill being added by
 * several bundlers
 *
 * @param {unknown} x - The value to check.
 * @returns {boolean} Always returns `false`.
 */
export const isBuffer: (x: unknown) => boolean = () => false;
