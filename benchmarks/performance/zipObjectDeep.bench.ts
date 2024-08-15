import { bench, describe } from 'vitest';
import { zipObjectDeep as zipObjectDeepToolkit } from 'es-toolkit/compat';
import { zipObjectDeep as zipObjectDeepLodash } from 'lodash';

describe('zipObjectDeep', () => {
  bench('es-toolkit/zipObjectDeep', () => {
    zipObjectDeepToolkit(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });

  bench('lodash/zipObjectDeep', () => {
    zipObjectDeepLodash(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });
});
