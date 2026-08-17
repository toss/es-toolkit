import { limitAsync as limitAsyncImpl } from '../promise/limitAsync.ts';

/**
 * Wraps an async function to limit the number of concurrent executions.
 *
 * @deprecated Use `limitAsync` from `es-toolkit/promise` instead. This export will be removed from `es-toolkit/array` in a future major version.
 */
export const limitAsync = limitAsyncImpl;
