import { bench, describe } from 'vitest';
import { snakeCase as snakeCaseToolkit } from 'es-toolkit';
import { snakeCase as snakeCaseLodash } from 'lodash';

describe('snakeCase', () => {
  describe('short string', () => {
    bench('es-toolkit/snakeCase', () => {
      const str = 'camelCase';
      snakeCaseToolkit(str);
    });

    bench('lodash/snakeCase', () => {
      const str = 'camelCase';
      snakeCaseLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STRING = 'thisIsAVeryLongStringThatContainsMultipleWords'.repeat(50);
    bench('es-toolkit/snakeCase', () => {
      const str = LONG_STRING;
      snakeCaseToolkit(str);
    });

    bench('lodash/snakeCase', () => {
      const str = LONG_STRING;
      snakeCaseLodash(str);
    });
  });
});
