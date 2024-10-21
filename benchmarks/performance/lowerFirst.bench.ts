import { lowerFirst as lowerFirstToolkit } from 'es-toolkit';
import { lowerFirst as lowerFirstLodash } from 'lodash';
import { bench, describe } from '../bench';

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
