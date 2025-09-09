import { getSymbols } from './getSymbols.ts';

export function getSymbolsIn(object: any) {
  const result: PropertyKey[] = [];
  while (object) {
    result.push(...getSymbols(object));
    object = Object.getPrototypeOf(object);
  }
  return result;
}
