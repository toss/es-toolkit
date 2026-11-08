import { size as sizeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('size', () => {
  bench('es-toolkit/size', () => {
    sizeToolkit([1, 2, 3, 4]);
    sizeToolkit('hello');
    sizeToolkit({ a: 1, b: 2, c: 3 });
    sizeToolkit([]);
    sizeToolkit('');
    sizeToolkit({});
    sizeToolkit(new Set([1, 2, 3]));
    sizeToolkit(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });

  bench('lodash/size', () => {
    lodash.size([1, 2, 3, 4]);
    lodash.size('hello');
    lodash.size({ a: 1, b: 2, c: 3 });
    lodash.size([]);
    lodash.size('');
    lodash.size({});
    lodash.size(new Set([1, 2, 3]));
    lodash.size(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });
});
