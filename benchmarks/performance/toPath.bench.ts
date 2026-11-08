import { toPath as toPathToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toPath: super simple', () => {
  bench('es-toolkit/toPath', () => {
    do_not_optimize(toPathToolkit('a'));
  });

  bench('lodash/toPath', () => {
    do_not_optimize(lodash.toPath('a'));
  });
});

group('toPath: dots', () => {
  bench('es-toolkit/toPath', () => {
    do_not_optimize(toPathToolkit('a.b.c'));
  });

  bench('lodash/toPath', () => {
    do_not_optimize(lodash.toPath('a.b.c'));
  });
});

group('toPath: brackets', () => {
  bench('es-toolkit/toPath', () => {
    do_not_optimize(toPathToolkit('a[b][c]'));
  });

  bench('lodash/toPath', () => {
    do_not_optimize(lodash.toPath('a[b][c]'));
  });
});

group('toPath: complex', () => {
  bench('es-toolkit/toPath', () => {
    do_not_optimize(toPathToolkit('a[b].c[0].d["e"]'));
  });

  bench('lodash/toPath', () => {
    do_not_optimize(lodash.toPath('a[b].c[0].d["e"]'));
  });
});
