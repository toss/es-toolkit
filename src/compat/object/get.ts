import { isDeepKey } from '../_internal/isDeepKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { toPath } from '../_internal/toPath.ts';
import type { Get } from './get.types.ts';

/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 * @template D - The type of the default value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T>(object: T, path: K | [K]): T[K];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T>(object: T | null | undefined, path: K | [K]): T[K] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K - The type of the key in the object.
 * @template D - The type of the default value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K extends keyof T, D>(
  object: T | null | undefined,
  path: K | [K],
  defaultValue: D
): Exclude<T[K], undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: [K1, K2]): T[K1][K2];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T | null | undefined,
  path: [K1, K2]
): T[K1][K2] | undefined;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template D - The type of the default value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], D>(
  object: T | null | undefined,
  path: [K1, K2],
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
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T,
  path: [K1, K2, K3]
): T[K1][K2][K3];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T | null | undefined,
  path: [K1, K2, K3]
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
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], D>(
  object: T | null | undefined,
  path: [K1, K2, K3],
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
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4];
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the first key in the object.
 * @template K2 - The type of the second key in the object.
 * @template K3 - The type of the third key in the object.
 * @template K4 - The type of the fourth key in the object.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T | null | undefined, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4] | undefined;
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
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  D,
>(object: T | null | undefined, path: [K1, K2, K3, K4], defaultValue: D): Exclude<T[K1][K2][K3][K4], undefined> | D;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T>(object: Record<number, T>, path: number): T;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T>(object: Record<number, T> | null | undefined, path: number): T | undefined;
/**
 * Retrieves the value at a given path from an object with numeric keys. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the value.
 * @template D - The type of the default value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<T, D>(object: Record<number, T> | null | undefined, path: number, defaultValue: D): T | D;
/**
 * Retrieves the value at a given path from a null or undefined object, returning the default value.
 *
 * @template D - The type of the default value.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the default value.
 */
export function get<D>(object: null | undefined, path: PropertyKey, defaultValue: D): D;
/**
 * Retrieves the value at a given path from a null or undefined object, returning undefined.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns undefined.
 */
export function get(object: null | undefined, path: PropertyKey): undefined;
/**
 * Retrieves the value at a given path from a string-keyed object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template P - The type of the path.
 *
 * @param data - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function get<T, P extends string>(data: T, path: P): string extends P ? any : Get<T, P>;
/**
 * Retrieves the value at a given path from a string-keyed object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @template T - The type of the object.
 * @template P - The type of the path.
 * @template D - The type of the default value.
 *
 * @param data - The object to query.
 * @param path - The path of the property to get.
 * @param defaultValue - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get<T, P extends string, D = Get<T, P>>(
  data: T,
  path: P,
  defaultValue: D
): Exclude<Get<T, P>, null | undefined> | D;
/**
 * Retrieves the value at a given path from an object. If the resolved value is undefined, the defaultValue is returned instead.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @param [defaultValue] - The value returned if the resolved value is undefined.
 * @returns - Returns the resolved value.
 */
export function get(object: unknown, path: PropertyKey | readonly PropertyKey[], defaultValue?: unknown): any;
export function get(object: any, path: PropertyKey | readonly PropertyKey[], defaultValue?: any): any {
  let resolvedPath;

  if (Array.isArray(path)) {
    resolvedPath = path;
  } else if (typeof path === 'string' && isDeepKey(path) && object?.[path] == null) {
    resolvedPath = toPath(path);
  } else {
    resolvedPath = [path];
  }

  if (resolvedPath.length === 0) {
    return defaultValue;
  }

  let current = object;
  let index;

  for (index = 0; index < resolvedPath.length && current != null; index++) {
    const key = toKey(resolvedPath[index]);

    current = current[key];
  }

  if (current === null && index === resolvedPath.length) {
    return current;
  }

  return current ?? defaultValue;
}
