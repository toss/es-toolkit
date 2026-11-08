import { get as getToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('get with simple string', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: 1, b: 2 }, 'a');
  });

  bench('lodash/get', () => {
    lodash.get({ a: 1, b: 2 }, 'a');
  });
});

group('get with string', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: { b: 3 } }, 'a.b');
  });

  bench('lodash/get', () => {
    lodash.get({ a: { b: 3 } }, 'a.b');
  });
});

group('get with string array', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: { b: 3 } }, ['a', 'b']);
  });

  bench('lodash/get', () => {
    lodash.get({ a: { b: 3 } }, ['a', 'b']);
  });
});
