import { isIndex } from './isIndex.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isObject } from '../predicate/isObject.ts';
import { eq } from '../util/eq.ts';

export function isIterateeCall(value: unknown, index: unknown, object: unknown): boolean {
  if (!isObject(object)) {
    return false;
  }

  if (
    (typeof index === 'number' && isArrayLike(object) && isIndex(index) && index < object.length) ||
    (typeof index === 'string' && index in object)
  ) {
    return eq((object as any)[index], value);
  }

  return false;
}
