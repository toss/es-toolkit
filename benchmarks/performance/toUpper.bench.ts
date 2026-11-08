import { toUpper as toUpperToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

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
    basicStrings.forEach(str => toUpperToolkitCompat(str));

    toUpperToolkitCompat(spacedStr);
    toUpperToolkitCompat(specialCharsStr);
    toUpperToolkitCompat(newlineStr);
    unicodeStrs.forEach(str => toUpperToolkitCompat(str));
    latinOperators.forEach(op => toUpperToolkitCompat(op));

    toUpperToolkitCompat(number);
    toUpperToolkitCompat(negZero);
    toUpperToolkitCompat(posZero);
    toUpperToolkitCompat(infinite);
    toUpperToolkitCompat(nan);
    toUpperToolkitCompat(nullValue);
    toUpperToolkitCompat(undefinedValue);
    arrays.forEach(arr => toUpperToolkitCompat(arr));
    toUpperToolkitCompat(nestedArrays);
    symbols.forEach(sym => toUpperToolkitCompat(sym));
    objects.forEach(obj => toUpperToolkitCompat(obj));
    toUpperToolkitCompat(mixedArray);
  });

  bench('lodash/toUpper', () => {
    basicStrings.forEach(str => lodash.toUpper(str));

    lodash.toUpper(spacedStr);
    lodash.toUpper(specialCharsStr);
    lodash.toUpper(newlineStr);
    unicodeStrs.forEach(str => lodash.toUpper(str));
    latinOperators.forEach(op => lodash.toUpper(op));

    lodash.toUpper(number);
    lodash.toUpper(negZero);
    lodash.toUpper(posZero);
    lodash.toUpper(infinite);
    lodash.toUpper(nan);
    lodash.toUpper(nullValue);
    lodash.toUpper(undefinedValue);
    arrays.forEach(arr => lodash.toUpper(arr));
    lodash.toUpper(nestedArrays);
    symbols.forEach(sym => lodash.toUpper(sym));
    objects.forEach(obj => lodash.toUpper(obj));
    lodash.toUpper(mixedArray);
  });
});
