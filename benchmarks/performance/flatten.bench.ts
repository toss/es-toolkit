import { flatten as flattenToolkit } from 'es-toolkit';
import { flatten as flattenCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const createNestedArray = (values: any[]): any[] => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

group('flatten', () => {
  const arr = createNestedArray(Array.from({ length: 30 }, (_, index) => index));

  bench('es-toolkit/flatten', () => {
    flattenToolkit(arr, 30);
  });

  bench('es-toolkit/flatten (compat)', () => {
    // @ts-expect-error - depth parameter is a hidden feature in compat version
    flattenCompatToolkit(arr, 30);
  });

  bench('lodash/flattenDepth', () => {
    lodash.flattenDepth(arr, 30);
  });

  bench('js built-in/flat', () => {
    arr.flat(30);
  });
});
