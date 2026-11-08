import { startsWith as startsWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('startsWith', () => {
  bench('es-toolkit/startsWith', () => {
    const str = 'fooBar';
    startsWithToolkit(str, 'foo');
    startsWithToolkit(str, 'Bar', 3);
  });

  bench('lodash/startsWith', () => {
    const str = 'fooBar';
    lodash.startsWith(str, 'foo');
    lodash.startsWith(str, 'Bar', 3);
  });
});
