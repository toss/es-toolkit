import { toPath } from './toPath';
import { toKey } from '../_internal/toKey.ts';
import { last } from '../array/last.ts';
import { get } from '../object/get.ts';

/**
 * Invokes the method at `path` of `object` with the given arguments.
 *
 * @param {unknown} object - The object to query.
 * @param {PropertyKey | PropertyKey[]} path - The path of the method to invoke.
 * @param {any[]} args - The arguments to invoke the method with.
 * @returns {any} - Returns the result of the invoked method.
 *
 * @example
 * const object = {
 *   a: {
 *     b: function (x, y) {
 *       return x + y;
 *     }
 *   }
 * };
 *
 * invoke(object, 'a.b', [1, 2]); // => 3
 * invoke(object, ['a', 'b'], [1, 2]); // => 3
 */
export function invoke(object: unknown, path: PropertyKey | PropertyKey[], args: any[] = []): any {
  if (object == null) {
    return;
  }

  switch (typeof path) {
    case 'string': {
      if (typeof object === 'object' && Object.hasOwn(object, path)) {
        return invokeImpl(object, [path], args);
      }
      return invokeImpl(object, toPath(path), args);
    }
    case 'number':
    case 'symbol': {
      return invokeImpl(object, [path], args);
    }
    default: {
      if (Array.isArray(path)) {
        return invokeImpl(object, path, args);
      } else {
        return invokeImpl(object, [path], args);
      }
    }
  }
}

function invokeImpl(object: unknown, path: PropertyKey[], args: any[]) {
  const parent = get(object, path.slice(0, -1), object);

  if (parent == null) {
    return undefined;
  }

  let lastKey = last(path);
  let lastValue = lastKey?.valueOf();

  if (typeof lastValue === 'number') {
    lastKey = toKey(lastValue);
  } else {
    lastKey = String(lastKey);
  }

  const func = get(parent, lastKey);

  return func?.apply(parent, args);
}
