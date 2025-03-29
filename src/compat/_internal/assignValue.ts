import { eq } from '../util/eq';

export const assignValue = (object: any, key: PropertyKey, value: any): void => {
  const objValue = object[key];
  if (!(Object.hasOwn(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    object[key] = value;
  }
};
