import { keys } from './keys';
import { isObject } from '../predicate/isObject';
import { eq } from '../util/eq';

/**
 * Creates an object that inherits from the prototype object.
 * If a properties object is given, its own enumerable string keyed properties are assigned to the created object.
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
      const propsValue = (properties as any)[key];
      const protoValue = proto[key];
      if (!(Object.hasOwn(proto, key) && eq(protoValue, propsValue)) || (propsValue === undefined && !(key in proto))) {
        proto[key] = propsValue;
      }
    }
  }
  return proto as T & U;
}
