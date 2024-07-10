import { bench, describe } from 'vitest';
import { snakeCase as snakeCaseToolkit } from 'es-toolkit';
import { snakeCase as snakeCaseLodash } from 'lodash';

describe('snakeCase', () => {
  bench('es-toolkit/snakeCase', () => {
    const str = 'camleCase';
    snakeCaseToolkit(str);
  });

  bench('lodash/snakeCase', () => {
    const str = 'camelCase';
    snakeCaseLodash(str);
  });
});
