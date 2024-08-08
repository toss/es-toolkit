import { getTag } from './getTag';

export function isSymbol(value: unknown): value is symbol {
  const type = typeof value;
  return type === 'symbol' || (type === 'object' && value != null && getTag(value) === '[object Symbol]');
}
