import { keysIn } from '../object/keysIn.ts';

/**
 * Converts value to a plain object flattening inherited enumerable string keyed properties of value to own properties of the plain object.
 *
 * @param {any} value The value to convert.
 * @returns {Record<string, any>} Returns the converted plain object.
 *
 * @example
 * function Foo() {
 *   this.b = 2;
 * }
 * Foo.prototype.c = 3;
 * toPlainObject(new Foo()); // { b: 2, c: 3 }
 */
export function toPlainObject(value: any): Record<string, any> {
  const plainObject: Record<string, any> = {};

  for (const key of keysIn(value)) {
    const objValue = (value as any)[key];
    if (key === '__proto__') {
      Object.defineProperty(plainObject, key, {
        configurable: true,
        enumerable: true,
        value: objValue,
        writable: true,
      });
    } else {
      plainObject[key] = objValue;
    }
  }
  return plainObject;
}
