import { eq } from '../util/eq.ts';

export const assignValue = (object: any, key: PropertyKey, value: any): void => {
  const objValue = object[key];
  if (!(Object.prototype.hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    object[key] = value;
  }
};
