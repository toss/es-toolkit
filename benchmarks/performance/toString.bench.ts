import { toString as toStringToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toString', () => {
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
    lodash.toString(number);
    lodash.toString(object);
    lodash.toString(char);
    lodash.toString(longString);
    lodash.toString(array);
    lodash.toString(nestedArray);
  });
});
