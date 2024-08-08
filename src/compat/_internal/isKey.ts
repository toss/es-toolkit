import { isSymbol } from './isSymbol';

const regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const regexIsPlainProp = /^\w*$/;

export function isKey(value: any, object: unknown): boolean {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return regexIsPlainProp.test(value) || !regexIsDeepProp.test(value) || (object != null && value in Object(object));
}
