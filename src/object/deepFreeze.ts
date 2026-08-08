/**
 * Deeply freezes an object, making it and all nested objects immutable.
 *
 * Unlike `Object.freeze`, which only freezes the immediate properties of an object,
 * `deepFreeze` recursively freezes all nested objects and arrays.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to deeply freeze.
 * @returns {T} The deeply frozen object.
 *
 * @example
 * const frozen = deepFreeze({ user: { name: "Alex", age: 20 } });
 *
 * frozen.user = {}; // TypeError in strict mode
 * frozen.user.age = 22; // TypeError in strict mode
 */
export function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  Object.freeze(obj);

  const keys = Object.keys(obj) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const value = obj[keys[i]];

    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return obj;
}
