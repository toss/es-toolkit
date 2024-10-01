import { property as propertyToolkit_ } from 'es-toolkit/compat';
import { property as propertyLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const propertyToolkit = propertyToolkit_;
const propertyLodash = propertyLodash_;

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
