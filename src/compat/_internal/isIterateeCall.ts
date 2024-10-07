import { isIndex } from './isIndex';
import { isArrayLike } from '../predicate/isArrayLike';
import { isObject } from '../predicate/isObject';
import { eq } from '../util/eq';

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
