import { toUpper as toUpperToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toUpper', () => {
  const basicStrings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  const spacedStr = 'hello   world';
  const specialCharsStr = '!@#$hello%^&*';
  const newlineStr = 'tabs\tand\nnewlines';
  const unicodeStrs = ['café', 'über', 'señor'];
  const latinOperators = ['\xd7', '\xf7'];

  const number = 123;
  const negZero = -0;
  const posZero = 0;
  const infinite = Infinity;
  const nan = NaN;
  const nullValue = null;
  const undefinedValue = undefined;
  const arrays = [[1, 2, 3], ['a', 'b', 'c'], [1, 'b', -0], []];
  const nestedArrays = [1, [2, 3], 4];
  const symbols = [Symbol('test'), Symbol('')];
  const objects = [{ toString: () => 'custom' }, {}];
  const mixedArray = [1, 'b', Symbol('test'), null, undefined];

  bench('es-toolkit/compat/toUpper', () => {
    do_not_optimize(basicStrings.forEach(str => toUpperToolkitCompat(str)));

    do_not_optimize(toUpperToolkitCompat(spacedStr));
    do_not_optimize(toUpperToolkitCompat(specialCharsStr));
    do_not_optimize(toUpperToolkitCompat(newlineStr));
    do_not_optimize(unicodeStrs.forEach(str => toUpperToolkitCompat(str)));
    do_not_optimize(latinOperators.forEach(op => toUpperToolkitCompat(op)));

    do_not_optimize(toUpperToolkitCompat(number));
    do_not_optimize(toUpperToolkitCompat(negZero));
    do_not_optimize(toUpperToolkitCompat(posZero));
    do_not_optimize(toUpperToolkitCompat(infinite));
    do_not_optimize(toUpperToolkitCompat(nan));
    do_not_optimize(toUpperToolkitCompat(nullValue));
    do_not_optimize(toUpperToolkitCompat(undefinedValue));
    do_not_optimize(arrays.forEach(arr => toUpperToolkitCompat(arr)));
    do_not_optimize(toUpperToolkitCompat(nestedArrays));
    do_not_optimize(symbols.forEach(sym => toUpperToolkitCompat(sym)));
    do_not_optimize(objects.forEach(obj => toUpperToolkitCompat(obj)));
    do_not_optimize(toUpperToolkitCompat(mixedArray));
  });

  bench('lodash/toUpper', () => {
    do_not_optimize(basicStrings.forEach(str => lodash.toUpper(str)));

    do_not_optimize(lodash.toUpper(spacedStr));
    do_not_optimize(lodash.toUpper(specialCharsStr));
    do_not_optimize(lodash.toUpper(newlineStr));
    do_not_optimize(unicodeStrs.forEach(str => lodash.toUpper(str)));
    do_not_optimize(latinOperators.forEach(op => lodash.toUpper(op)));

    do_not_optimize(lodash.toUpper(number));
    do_not_optimize(lodash.toUpper(negZero));
    do_not_optimize(lodash.toUpper(posZero));
    do_not_optimize(lodash.toUpper(infinite));
    do_not_optimize(lodash.toUpper(nan));
    do_not_optimize(lodash.toUpper(nullValue));
    do_not_optimize(lodash.toUpper(undefinedValue));
    do_not_optimize(arrays.forEach(arr => lodash.toUpper(arr)));
    do_not_optimize(lodash.toUpper(nestedArrays));
    do_not_optimize(symbols.forEach(sym => lodash.toUpper(sym)));
    do_not_optimize(objects.forEach(obj => lodash.toUpper(obj)));
    do_not_optimize(lodash.toUpper(mixedArray));
  });
});
