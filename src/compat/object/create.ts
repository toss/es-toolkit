import { assignIn } from './assignIn';
import { isObject } from '../predicate/isObject';

export function create<T extends object, U extends object>(prototype: T, properties?: U): T & U {
  const proto = isObject(prototype) ? Object.create(prototype) : ({} as unknown as T);
  // return properties ? assignIn(proto, properties) : (proto as T & U);
}
