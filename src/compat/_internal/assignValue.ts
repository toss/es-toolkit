import { eq } from '../util/eq.ts';

export const assignValue = (object: any, key: PropertyKey, value: any): void => {
  const objValue = object[key];
  if (!(Object.hasOwn(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    if (key === '__proto__') {
      Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true,
      });
    } else {
      object[key] = value;
    }
  }
};
