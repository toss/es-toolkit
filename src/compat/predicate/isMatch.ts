import { difference } from "../../array/difference";

export function isMatch(target: object, source: object) {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      source = source ?? {};

      const keys = Object.keys(source);

      if (target == null) {
        if (keys.length === 0) {
          return true;
        }

        return false;
      }

      if (Array.isArray(target) && Array.isArray(source)) {
        const isSubset = difference(source, target).length === 0;

        return isSubset;
      }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!isMatch(target[key], source[key])) {
          return false
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
      return false;
    }
  }
}