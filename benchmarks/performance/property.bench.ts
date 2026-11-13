import { property as propertyToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('property', () => {
  bench('es-toolkit/property', () => {
    const getValue = propertyToolkit('a.b');
    do_not_optimize(getValue({ 'a.b': 1, a: { b: 1 } }));
  });

  bench('lodash/property', () => {
    const getValue = lodash.property('a.b');
    do_not_optimize(getValue({ 'a.b': 1, a: { b: 1 } }));
  });
});
