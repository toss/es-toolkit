import { bench, describe } from 'vitest';
import { upperFirst as upperFirstToolkit } from 'es-toolkit';
import { upperFirst as upperFirstLodash } from 'lodash';

describe('upperFirst', () => {
  describe('short string', () => {
    bench('es-toolkit/upperFirst', () => {
      const str = 'camelCase';
      upperFirstToolkit(str);
    });

    bench('lodash/upperFirst', () => {
      const str = 'camelCase';
      upperFirstLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperFirst', () => {
      upperFirstToolkit(LONG_STR);
    });

    bench('lodash/upperFirst', () => {
      upperFirstLodash(LONG_STR);
    });
  });
});
