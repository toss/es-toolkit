import { size as sizeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('size', () => {
  bench('es-toolkit/size', () => {
    do_not_optimize(sizeToolkit([1, 2, 3, 4]));
    do_not_optimize(sizeToolkit('hello'));
    do_not_optimize(sizeToolkit({ a: 1, b: 2, c: 3 }));
    do_not_optimize(sizeToolkit([]));
    do_not_optimize(sizeToolkit(''));
    do_not_optimize(sizeToolkit({}));
    do_not_optimize(sizeToolkit(new Set([1, 2, 3])));
    do_not_optimize(
      sizeToolkit(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ])
      )
    );
  });

  bench('lodash/size', () => {
    do_not_optimize(lodash.size([1, 2, 3, 4]));
    do_not_optimize(lodash.size('hello'));
    do_not_optimize(lodash.size({ a: 1, b: 2, c: 3 }));
    do_not_optimize(lodash.size([]));
    do_not_optimize(lodash.size(''));
    do_not_optimize(lodash.size({}));
    do_not_optimize(lodash.size(new Set([1, 2, 3])));
    do_not_optimize(
      lodash.size(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ])
      )
    );
  });
});
