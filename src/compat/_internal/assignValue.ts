import { eq } from '../util/eq.ts';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const assignValue = (object: any, key: PropertyKey, value: any): void => {
  const objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    object[key] = value;
  }
};
