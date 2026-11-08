import { toPath as toPathToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toPath: super simple', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a');
  });

  bench('lodash/toPath', () => {
    lodash.toPath('a');
  });
});

group('toPath: dots', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a.b.c');
  });

  bench('lodash/toPath', () => {
    lodash.toPath('a.b.c');
  });
});

group('toPath: brackets', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a[b][c]');
  });

  bench('lodash/toPath', () => {
    lodash.toPath('a[b][c]');
  });
});

group('toPath: complex', () => {
  bench('es-toolkit/toPath', () => {
    toPathToolkit('a[b].c[0].d["e"]');
  });

  bench('lodash/toPath', () => {
    lodash.toPath('a[b].c[0].d["e"]');
  });
});
