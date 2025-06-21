import { eq } from '../util/eq.ts';
import { isPrototypePollutionKey } from '../../_internal/isPrototypePollutionKey.ts';

export const assignValue = (object: any, key: PropertyKey, value: any): void => {
  // Prevent prototype pollution
  if (isPrototypePollutionKey(key)) {
    return;
  }
  
  const objValue = object[key];
  if (!(Object.hasOwn(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    object[key] = value;
  }
};
