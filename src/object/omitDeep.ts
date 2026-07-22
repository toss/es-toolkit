type Paths<T, Prefix extends string = ''> = T extends object
  ? T extends Array<infer O>
    ? Paths<O, Prefix>
    : {
        [K in keyof T]: K extends string
          ? Prefix extends ''
            ? K | Paths<T[K], K>
            : `${Prefix}.${K}` | Paths<T[K], `${Prefix}.${K}`>
          : never;
      }[keyof T]
  : never;

type Split<S extends string> = S extends `${infer First}.${infer Rest}` ? [First, ...Split<Rest>] : [S];

type OmitFields<T, Path extends readonly string[], CurrentPath extends readonly string[] = []> = T extends object
  ? T extends Array<infer O extends Record<string, unknown>>
    ? Array<OmitFields<O, Path, CurrentPath>>
    : T extends unknown[]
      ? T
      : {
          [K in keyof T as [...CurrentPath, K] extends Split<Path[number]> ? never : K]: OmitFields<
            T[K],
            Path,
            [...CurrentPath, K & string]
          >;
        }
  : T;

export type OmitDeep<T, Paths extends readonly string[]> = OmitFields<T, Paths>;

function omitDeepImpl<T>(object: T, paths: string[], currentPath = ''): any {
  if (object == null || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(item => omitDeepImpl(item, paths, currentPath));
  }

  const result: Record<string, unknown> = {};

  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]!;
    const value = (object as Record<string, unknown>)[key]!;

    const newPath = currentPath === '' ? key : `${currentPath}.${key}`;

    if (paths.some(path => path === newPath)) {
      continue;
    }

    result[key] = value !== null && typeof value === 'object' ? omitDeepImpl(value, paths, newPath) : value;
  }

  return result;
}

/**
 * Creates a new object with specified nested paths omitted.
 *
 * This function takes an object and an array of dot-separated paths, and returns a new object that
 * excludes the properties corresponding to the specified paths. Paths use dot notation to reference
 * nested properties (e.g. `'user.address.city'`).
 *
 * @template T - The type of object.
 * @template P - The type of paths to omit.
 * @param object - The object to omit paths from.
 * @param paths - An array of dot-separated paths to be omitted from the object.
 * @returns A new object with the specified paths omitted.
 *
 * @example
 * const obj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
 * const result = omitDeep(obj, ['b.x']);
 * // result will be { a: 1, b: { y: 3 }, c: 4 }
 *
 * @example
 * // Example with nested objects
 * const nested = {
 *   user: {
 *     id: 1,
 *     profile: {
 *       name: 'John',
 *       email: 'john@example.com'
 *     }
 *   }
 * };
 * const nestedResult = omitDeep(nested, ['user.profile.email']);
 * // nestedResult will be:
 * // {
 * //   user: {
 * //     id: 1,
 * //     profile: {
 * //       name: 'John'
 * //     }
 * //   }
 * // }
 *
 * @example
 * // Example with arrays of objects
 * const arr = {
 *   users: [
 *     { id: 1, secret: 'abc' },
 *     { id: 2, secret: 'def' }
 *   ]
 * };
 * const arrResult = omitDeep(arr, ['users.secret']);
 * // arrResult will be {
 * //   users: [
 * //     { id: 1 },
 * //     { id: 2 }
 * //   ]
 * // }
 */
export function omitDeep<T, const P extends ReadonlyArray<Paths<T>>>(object: T, paths: P): OmitDeep<T, P> {
  return omitDeepImpl(object, paths as unknown as string[]) as OmitDeep<T, P>;
}
