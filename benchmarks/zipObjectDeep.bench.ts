import { bench, describe } from 'vitest';
import { zipObjectDeep as zipObjectDeepToolkit } from 'es-toolkit';
import { zipObjectDeep as zipObjectDeepLodash } from 'lodash';

describe('zipObjectDeep', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectDeepToolkit(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });

  bench('lodash/zipObject', () => {
    zipObjectDeepLodash(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });
});
