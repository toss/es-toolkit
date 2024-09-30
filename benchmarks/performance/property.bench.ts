import { bench, describe } from 'vitest';
import { property as propertyToolkit } from 'es-toolkit/compat';
import { property as propertyLodash } from 'lodash';

describe('property', () => {
  bench('es-toolkit/property', () => {
    const getValue = propertyToolkit('a.b');
    getValue({ 'a.b': 1, a: { b: 1 } });
  });

  bench('lodash/property', () => {
    const getValue = propertyLodash('a.b');
    getValue({ 'a.b': 1, a: { b: 1 } });
  });
});
