import { set } from './set';
import { flattenDeep } from '../../array';
import { get } from './get';
import { isNil } from '../index';

export function pick<T>(
  object: T,
  ...args: Array<
    | keyof T
    | (NonNullable<unknown> & string)
    | Array<keyof T | (NonNullable<unknown> & string)>
    | Array<Array<NonNullable<unknown> & string>>
  >
): Partial<T> {
  if (isNil(object)) {
    return {};
  }

  const typedObject = object as Record<string | number, any>;

  const result = {};
  const flattenArgs = flattenDeep(args.map(arg => (typeof arg === 'object' ? Array.from(arg as any) : arg))) as Array<
    keyof typeof typedObject
  >;

  for (const arg of flattenArgs) {
    if (String(arg).includes('.') && arg in typedObject) {
      result[arg] = get(typedObject, arg);
      continue;
    }

    set(result, arg, get(typedObject, arg));
  }

  return result;
}
