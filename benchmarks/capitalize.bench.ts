import { bench, describe } from 'vitest';
import { capitalize as capitalizeToolkit } from 'es-toolkit';
import { capitalize as capitalizeLodash } from 'lodash';

describe('capitalize', () => {
  bench('es-toolkit/capitalize', () => {
    const str = 'camelCase';
    capitalizeToolkit(str);
  });

  bench('lodash/capitalize', () => {
    const str = 'camelCase';
    capitalizeLodash(str);
  });
});
