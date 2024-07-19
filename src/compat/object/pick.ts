import { set } from './set';
import { flattenDeep } from '../../array';
import { get } from './get';
import { isNil } from '../index';

export function pick<T>(
  obj: T,
  ...keys: Array<
    | keyof T
    | (NonNullable<unknown> & string)
    | Array<keyof T | (NonNullable<unknown> & string)>
    | Array<Array<NonNullable<unknown> & string>>
  >
): Partial<T> {
  if (isNil(obj)) {
    return {};
  }

  const typedObject = obj as Record<string | number, any>;

  const result = {};
  const flattenArgs = flattenDeep(keys.map(arg => (typeof arg === 'object' ? Array.from(arg as any) : arg))) as Array<
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
