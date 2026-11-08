import { endsWith as endsWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('endsWith', () => {
  bench('es-toolkit/endsWith', () => {
    const str = 'fooBar';
    do_not_optimize(endsWithToolkit(str, 'Bar'));
    do_not_optimize(endsWithToolkit(str, 'foo', 3));
  });

  bench('lodash/endsWith', () => {
    const str = 'fooBar';
    do_not_optimize(lodash.endsWith(str, 'Bar'));
    do_not_optimize(lodash.endsWith(str, 'foo', 3));
  });
});
