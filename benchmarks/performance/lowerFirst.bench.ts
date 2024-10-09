import { bench, describe } from 'vitest';
import { lowerFirst as lowerFirstToolkit_ } from 'es-toolkit';
import { lowerFirst as lowerFirstLodash_ } from 'lodash';

const lowerFirstToolkit = lowerFirstToolkit_;
const lowerFirstLodash = lowerFirstLodash_;

describe('lowerFirst', () => {
  describe('short string', () => {
    bench('es-toolkit/lowerFirst', () => {
      const str = 'camelCase';
      lowerFirstToolkit(str);
    });

    bench('lodash/lowerFirst', () => {
      const str = 'camelCase';
      lowerFirstLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/lowerFirst', () => {
      lowerFirstToolkit(LONG_STR);
    });

    bench('lodash/lowerFirst', () => {
      lowerFirstLodash(LONG_STR);
    });
  });
});