import { bench, describe } from 'vitest';
import { upperFirst as upperFirstToolkit_ } from 'es-toolkit';
import { upperFirst as upperFirstLodash_ } from 'lodash';

const upperFirstToolkit = upperFirstToolkit_;
const upperFirstLodash = upperFirstLodash_;

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
