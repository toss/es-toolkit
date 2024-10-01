import { bench, describe } from 'vitest';
import { toPath as toPathToolkit_ } from 'es-toolkit/compat';
import { toPath as toPathLodash_ } from 'lodash';

const toPathToolkit = toPathToolkit_;
const toPathLodash = toPathLodash_;

describe('toPath: super simple', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a');
  });

  bench('lodash/toPath', () => {
    toPathLodash('a');
  });
});

describe('toPath: dots', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a.b.c');
  });

  bench('lodash/toPath', () => {
    toPathLodash('a.b.c');
  });
});

describe('toPath: brackets', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a[b][c]');
  });

  bench('lodash/toPath', () => {
    toPathLodash('a[b][c]');
  });
});

describe('toPath: complex', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a[b].c[0].d["e"]');
  });

  bench('lodash/toPath', () => {
    toPathLodash('a[b].c[0].d["e"]');
  });
});
