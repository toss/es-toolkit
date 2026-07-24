/**
 * Recursively freezes an object and all of its nested objects/arrays so that
 * no property of the result (or its descendants) can be added, removed, or
 * modified. Returns the same reference, now frozen.
 *
 * @template T - The type of the object.
 * @param obj - The object (or value) to deeply freeze.
 * @returns The frozen object (shallowly-frozen primitives / nullish values are
 * returned unchanged).
 *
 * @example
 * const target = deepFreeze({ user: { name: 'Alex', age: 20 } })
 * target.user = {}        // throws in strict mode / no-op otherwise
 * target.user.age = 22    // throws in strict mode / no-op otherwise
 *
 * @group object
 */
export function deepFreeze<T>(obj: T): T {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  if (Object.isFrozen(obj)) {
    return obj;
  }
  // Freeze this object first so cyclic references short-circuit.
  Object.freeze(obj);
  const keys = Reflect.ownKeys(obj as object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (obj as Record<PropertyKey, unknown>)[key];
    if (value != null && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return obj;
}
