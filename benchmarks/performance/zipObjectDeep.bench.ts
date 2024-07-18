import { bench, describe } from 'vitest';
import { zipObjectDeep as zipObjectDeepToolkit } from 'es-toolkit/compat';
import { zipObjectDeep as zipObjectDeepLodash } from 'lodash';

describe('zipObjectDeep', () => {
  bench('es-toolkit/zipObjectDeep', () => {
    const str = 'kebab-case';
    zipObjectDeepToolkit(['a.b[0].c', 'a.b[1].d'], [1, 2])
  });

  bench('lodash/zipObjectDeep', () => {
    const str = 'kebab-case';
    zipObjectDeepLodash(['a.b[0].c', 'a.b[1].d'], [1, 2])
  });
});
