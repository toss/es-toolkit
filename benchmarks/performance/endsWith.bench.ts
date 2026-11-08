import { endsWith as endsWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('endsWith', () => {
  bench('es-toolkit/endsWith', () => {
    const str = 'fooBar';
    endsWithToolkit(str, 'Bar');
    endsWithToolkit(str, 'foo', 3);
  });

  bench('lodash/endsWith', () => {
    const str = 'fooBar';
    lodash.endsWith(str, 'Bar');
    lodash.endsWith(str, 'foo', 3);
  });
});
