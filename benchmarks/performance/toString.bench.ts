import { bench, describe } from 'vitest';
import { toString as toStringToolkitCompat } from 'es-toolkit/compat';
import { toString as toStringLodash } from 'lodash';

describe('toString', () => {
  const number = -0;
  const object = Object(number);
  const char = 'a';
  const longString = char.repeat(1e6);
  const array = [number, object, char, longString];
  const nestedArray = [array, array, array, array];

  bench('es-toolkit/compat/toString', () => {
    toStringToolkitCompat(number);
    toStringToolkitCompat(object);
    toStringToolkitCompat(char);
    toStringToolkitCompat(longString);
    toStringToolkitCompat(array);
    toStringToolkitCompat(nestedArray);
  });

  bench('lodash/toString', () => {
    toStringLodash(number);
    toStringLodash(object);
    toStringLodash(char);
    toStringLodash(longString);
    toStringLodash(array);
    toStringLodash(nestedArray);
  });
});
