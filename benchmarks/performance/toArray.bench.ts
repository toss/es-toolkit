import { toArray as toArrayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toArray', () => {
  bench('es-toolkit/compat/toArray', () => {
    toArrayToolkitCompat({ a: 1, b: 2 });
    toArrayToolkitCompat('abc');
    toArrayToolkitCompat(1);
    toArrayToolkitCompat(null);
    toArrayToolkitCompat(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    );
  });

  bench('lodash/toArray', () => {
    lodash.toArray({ a: 1, b: 2 });
    lodash.toArray('abc');
    lodash.toArray(1);
    lodash.toArray(null);
    lodash.toArray(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    );
  });
});
