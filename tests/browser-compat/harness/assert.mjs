/**
 * Minimal deep-equality assertion shared by the Node validation step and the
 * browser harness. Written in ES2015-compatible syntax so downlevel fixture
 * builds do not need to transform it beyond module syntax.
 */
export function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
    return true;
  }
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
  }
  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map) || !(b instanceof Map) || a.size !== b.size) {
      return false;
    }
    let equal = true;
    a.forEach(function (value, key) {
      if (!b.has(key) || !deepEqual(value, b.get(key))) {
        equal = false;
      }
    });
    return equal;
  }
  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set) || !(b instanceof Set) || a.size !== b.size) {
      return false;
    }
    let equal = true;
    a.forEach(function (value) {
      if (!b.has(value)) {
        equal = false;
      }
    });
    return equal;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    // eslint-disable-next-line prefer-object-has-own -- the harness must run in browsers without Object.hasOwn
    if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

function stringify(value) {
  try {
    if (typeof value === 'function') {
      return '[Function]';
    }
    if (typeof value === 'bigint') {
      return String(value) + 'n';
    }
    const json = JSON.stringify(value, function (key, v) {
      if (typeof v === 'bigint') {
        return String(v) + 'n';
      }
      if (typeof v === 'function') {
        return '[Function]';
      }
      if (v instanceof Map) {
        return '[Map]';
      }
      if (v instanceof Set) {
        return '[Set]';
      }
      return v;
    });
    return json === undefined ? String(value) : json;
  } catch (e) {
    return String(value);
  }
}

export function assertEq(actual, expected) {
  if (!deepEqual(actual, expected)) {
    throw new Error('Expected ' + stringify(expected) + ' but got ' + stringify(actual));
  }
}
