import { keys } from './keys.ts';
import { assignValue } from '../_internal/assignValue.ts';
import { isObject } from '../predicate/isObject.ts';

/**
 * Creates an object that inherits from the prototype object.
 *
 * If `properties` are provided, they will be added to the new object.
 * Only string-keyed enumerable properties directly owned by the `properties` object are copied.
 * Inherited properties or those with `Symbol` keys are not copied.
 *
 * @template T - The prototype object type.
 * @template U - The properties object type.
 * @param {T} prototype - The object to inherit from.
 * @param {U} properties - The properties to assign to the created object.
 * @returns {T & U} The new object.
 */
export function create<T extends object, U extends object>(prototype: T, properties?: U): T & U {
  const proto = isObject(prototype) ? Object.create(prototype) : ({} as unknown as T);
  if (properties != null) {
    const propsKeys = keys(properties);
    for (let i = 0; i < propsKeys.length; i++) {
      const key = propsKeys[i];
      const propsValue = properties[key as keyof U];
      assignValue(proto, key, propsValue);
    }
  }
  return proto as T & U;
}
