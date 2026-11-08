import { fill as fillToolkit } from 'es-toolkit';
import { fill as fillCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('fill function performance comparison', () => {
  bench('es-toolkit/fill', () => {
    fillToolkit([1, 2, 3], 10);
  });

  bench('es-toolkit/compat/fill', () => {
    fillCompatToolkit([1, 2, 3], 10);
  });

  bench('lodash/fill', () => {
    lodash.fill([1, 2, 3], 10);
  });
});

group('fill function performance with custom start and end', () => {
  bench('es-toolkit/fill', () => {
    fillToolkit([4, 6, 8, 10], '*', 1, 3);
  });

  bench('es-toolkit/compat/fill', () => {
    fillCompatToolkit([4, 6, 8, 10], '*', 1, 3);
  });

  bench('lodash/fill', () => {
    lodash.fill([4, 6, 8, 10], '*', 1, 3);
  });
});
