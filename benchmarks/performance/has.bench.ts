import { has as hasToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('has with string', () => {
  bench('es-toolkit/has', () => {
    hasToolkit({ a: { b: 3 } }, 'a.b');
  });

  bench('lodash/has', () => {
    lodash.has({ a: { b: 3 } }, 'a.b');
  });
});

group('has with string array', () => {
  bench('es-toolkit/has', () => {
    hasToolkit({ a: { b: 3 } }, ['a', 'b']);
  });

  bench('lodash/has', () => {
    lodash.has({ a: { b: 3 } }, ['a', 'b']);
  });
});
