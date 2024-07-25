import { isPrimitive } from '../../predicate';
import { isArrayMatch } from '../_internal/isArrayMatch';
import { isMapMatch } from '../_internal/isMapMatch';
import { isSetMatch } from '../_internal/isSetMatch';

export function isMatch(target: any, source: any) {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      if (source == null) {
        return true;
      }

      source = source ?? {};

      const keys = Object.keys(source as any);

      if (target == null) {
        if (keys.length === 0) {
          return true;
        }

        return false;
      }

      if (Array.isArray(source)) {
        return isArrayMatch(target, source);
      }

      if (source instanceof Map) {
        return isMapMatch(target, source);
      }

      if (source instanceof Set) {
        return isSetMatch(target, source);
      }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!isPrimitive(target) && !(key in target)) {
          return false;
        }

        if (source[key] === undefined && target[key] !== undefined) {
          return false;
        }

        if (!isMatch(target[key], source[key])) {
          return false;
        }
      }

      return true;
    }
    case 'function': {
      if (Object.keys(source).length > 0) {
        return isMatch(target, { ...source });
      }

      return false;
    }
    default: {
      return !source;
    }
  }
}
