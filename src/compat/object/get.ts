import { isDeepKey } from '../_internal/isDeepKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { toPath } from '../util/toPath.ts';
import type { Get } from './get.types.ts';

/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 * @template D - The type of the default value.
 *
 * @param {T} object - The object to query.
 * @param {K | [K]} path - The path of the property to get.
 * @returns {T[K]} - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T>(object: T, path: K | readonly [K]): T[K];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {K | [K]} path - The path of the property to get.
 * @returns {T[K] | undefined} - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T>(
  object: T | null | undefined,
  path: K | readonly [K]
): T[K] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 * @template D - The type of the default value.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {K | [K]} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {Exclude<T[K], undefined> | D} - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T, D>(
  object: T | null | undefined,
  path: K | readonly [K],
  defaultValue: D
): Exclude<T[K], undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 *
 * @param {T} object - The object to query.
 * @param {[K1, K2]} path - The path of the property to get.
 * @returns {T[K1][K2]} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T,
  path: readonly [K1, K2]
): T[K1][K2];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2]} path - The path of the property to get.
 * @returns {T[K1][K2] | undefined} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T | null | undefined,
  path: readonly [K1, K2]
): T[K1][K2] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template D - The type of the default value.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2]} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {Exclude<T[K1][K2], undefined> | D} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], D>(
  object: T | null | undefined,
  path: readonly [K1, K2],
  defaultValue: D
): Exclude<T[K1][K2], undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 *
 * @param {T} object - The object to query.
 * @param {[K1, K2, K3]} path - The path of the property to get.
 * @returns {T[K1][K2][K3]} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T,
  path: readonly [K1, K2, K3]
): T[K1][K2][K3];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2, K3]} path - The path of the property to get.
 * @returns {T[K1][K2][K3] | undefined} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T | null | undefined,
  path: readonly [K1, K2, K3]
): T[K1][K2][K3] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 * @template D - The type of the default value.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2, K3]} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {Exclude<T[K1][K2][K3], undefined> | D} - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], D>(
  object: T | null | undefined,
  path: readonly [K1, K2, K3],
  defaultValue: D
): Exclude<T[K1][K2][K3], undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 * @template K4 - The type of the fourth key in the object.
 *
 * @param {T} object - The object to query.
 * @param {[K1, K2, K3, K4]} path - The path of the property to get.
 * @returns {T[K1][K2][K3][K4]} - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T, path: readonly [K1, K2, K3, K4]): T[K1][K2][K3][K4];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 * @template K4 - The type of the fourth key in the object.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2, K3, K4]} path - The path of the property to get.
 * @returns {T[K1][K2][K3][K4] | undefined} - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T | null | undefined, path: readonly [K1, K2, K3, K4]): T[K1][K2][K3][K4] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 * @template K4 - The type of the fourth key in the object.
 * @template D - The type of the default value.
 *
 * @param {T | null | undefined} object - The object to query.
 * @param {[K1, K2, K3, K4]} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {Exclude<T[K1][K2][K3][K4], undefined> | D} - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  D,
>(
  object: T | null | undefined,
  path: readonly [K1, K2, K3, K4],
  defaultValue: D
): Exclude<T[K1][K2][K3][K4], undefined> | D;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 *
 * @param {Record<number, T>} object - The object to query.
 * @param {number} path - The path of the property to get.
 * @returns {T} - Returns the resolved value.
 */
export function get<T>(object: Record<number, T>, path: number): T;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 *
 * @param {Record<number, T> | null | undefined} object - The object to query.
 * @param {number} path - The path of the property to get.
 * @returns {T | undefined} - Returns the resolved value.
 */
export function get<T>(object: Record<number, T> | null | undefined, path: number): T | undefined;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 * @template D - The type of the default value.
 *
 * @param {Record<number, T> | null | undefined} object - The object to query.
 * @param {number} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {T | D} - Returns the resolved value.
 */
export function get<T, D>(object: Record<number, T> | null | undefined, path: number, defaultValue: D): T | D;
/**
 * Retrieves the value at a given path from a null or undefined object, returning the default value.
 *
 * @template D - The type of the default value.
 *
 * @param {null | undefined} object - The object to query.
 * @param {PropertyKey} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {D} - Returns the default value.
 */
export function get<D>(object: null | undefined, path: PropertyKey, defaultValue: D): D;
/**
 * Retrieves the value at a given path from a null or undefined object, returning undefined.
 *
 * @param {null | undefined} object - The object to query.
 * @param {PropertyKey} path - The path of the property to get.
 * @returns {undefined} - Returns undefined.
 */
export function get(object: null | undefined, path: PropertyKey): undefined;
/**
 * Retrieves the value at a given path from a string-keyed object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template P - The type of the path.
 *
 * @param {T} data - The object to query.
 * @param {P} path - The path of the property to get.
 * @returns {string extends P ? any : Get<T, P>} - Returns the resolved value.
 */
export function get<T, P extends string>(data: T, path: P): string extends P ? any : Get<T, P>;
/**
 * Retrieves the value at a given path from a string-keyed object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template P - The type of the path.
 * @template D - The type of the default value.
 *
 * @param {T} data - The object to query.
 * @param {P} path - The path of the property to get.
 * @param {D} defaultValue - The value returned if the resolved value is undefined.
 * @returns {Exclude<Get<T, P>, null | undefined> | D} - Returns the resolved value.
 */
export function get<T, P extends string, D = Get<T, P>>(
  data: T,
  path: P,
  defaultValue: D
): Exclude<Get<T, P>, null | undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @param {unknown} object - The object to query.
 * @param {PropertyKey | readonly PropertyKey[]} path - The path of the property to get.
 * @param {unknown} [defaultValue] - The value returned if the resolved value is undefined.
 * @returns {any} - Returns the resolved value.
 */
export function get(object: unknown, path: PropertyKey | readonly PropertyKey[], defaultValue?: unknown): any;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @param {unknown} object - The object to query.
 * @param {PropertyKey | readonly PropertyKey[]} path - The path of the property to get.
 * @param {unknown} [defaultValue] - The value returned if the resolved value is undefined.
 * @returns {any} - Returns the resolved value.
 */
export function get(object: any, path: PropertyKey | readonly PropertyKey[], defaultValue?: any): any {
  if (object == null) {
    return defaultValue;
  }

  switch (typeof path) {
    case 'string': {
      const result = object[path];

      if (result === undefined) {
        if (isDeepKey(path)) {
          return get(object, toPath(path), defaultValue);
        } else {
          return defaultValue;
        }
      }

      return result;
    }
    case 'number':
    case 'symbol': {
      if (typeof path === 'number') {
        path = toKey(path);
      }

      const result = object[path];

      if (result === undefined) {
        return defaultValue;
      }

      return result;
    }
    default: {
      if (Array.isArray(path)) {
        return getWithPath(object, path, defaultValue);
      }

      if (Object.is(path?.valueOf(), -0)) {
        path = '-0';
      } else {
        path = String(path);
      }

      const result = object[path];

      if (result === undefined) {
        return defaultValue;
      }

      return result;
    }
  }
}

function getWithPath(object: any, path: readonly PropertyKey[], defaultValue?: any): any {
  if (path.length === 0) {
    return defaultValue;
  }

  let current = object;

  for (let index = 0; index < path.length; index++) {
    if (current == null) {
      return defaultValue;
    }

    current = current[path[index]];
  }

  if (current === undefined) {
    return defaultValue;
  }

  return current;
}
