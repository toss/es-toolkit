import { bench, describe } from 'vitest';
import { capitalize as capitalizeToolkit } from 'es-toolkit';
import { capitalize as capitalizeLodash } from 'lodash';

describe('capitalize', () => {
  describe('short string', () => {
    bench('es-toolkit/capitalize', () => {
      const str = 'camelCase';
      capitalizeToolkit(str);
    });

    bench('lodash/capitalize', () => {
      const str = 'camelCase';
      capitalizeLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(100);
    bench('es-toolkit/capitalize', () => {
      capitalizeToolkit(LONG_STR);
    });

    bench('lodash/capitalize', () => {
      capitalizeLodash(LONG_STR);
    });
  });
});
