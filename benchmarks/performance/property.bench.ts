import { property as propertyToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('property', () => {
  bench('es-toolkit/property', () => {
    const getValue = propertyToolkit('a.b');
    getValue({ 'a.b': 1, a: { b: 1 } });
  });

  bench('lodash/property', () => {
    const getValue = lodash.property('a.b');
    getValue({ 'a.b': 1, a: { b: 1 } });
  });
});
