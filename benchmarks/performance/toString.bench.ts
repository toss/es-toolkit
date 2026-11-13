import { toString as toStringToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toString', () => {
  const number = -0;
  const object = Object(number);
  const char = 'a';
  const longString = char.repeat(1e6);
  const array = [number, object, char, longString];
  const nestedArray = [array, array, array, array];

  bench('es-toolkit/compat/toString', () => {
    do_not_optimize(toStringToolkitCompat(number));
    do_not_optimize(toStringToolkitCompat(object));
    do_not_optimize(toStringToolkitCompat(char));
    do_not_optimize(toStringToolkitCompat(longString));
    do_not_optimize(toStringToolkitCompat(array));
    do_not_optimize(toStringToolkitCompat(nestedArray));
  });

  bench('lodash/toString', () => {
    do_not_optimize(lodash.toString(number));
    do_not_optimize(lodash.toString(object));
    do_not_optimize(lodash.toString(char));
    do_not_optimize(lodash.toString(longString));
    do_not_optimize(lodash.toString(array));
    do_not_optimize(lodash.toString(nestedArray));
  });
});
