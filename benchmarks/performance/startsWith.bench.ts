import { startsWith as startsWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('startsWith', () => {
  bench('es-toolkit/startsWith', () => {
    const str = 'fooBar';
    do_not_optimize(startsWithToolkit(str, 'foo'));
    do_not_optimize(startsWithToolkit(str, 'Bar', 3));
  });

  bench('lodash/startsWith', () => {
    const str = 'fooBar';
    do_not_optimize(lodash.startsWith(str, 'foo'));
    do_not_optimize(lodash.startsWith(str, 'Bar', 3));
  });
});
