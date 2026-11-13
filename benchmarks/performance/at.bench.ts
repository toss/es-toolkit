import { at as atToolkit } from 'es-toolkit';
import { at as atToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('at', () => {
  const data = ['a', 'b', 'c', 'd', 'e'];
  const indices = [0, 2, -2, 1.5, -1.5];

  bench('es-toolkit/at', () => {
    do_not_optimize(atToolkit(data, indices));
  });

  bench('es-toolkit/compat/at', () => {
    do_not_optimize(atToolkitCompat(data, indices));
  });

  bench('lodash/at', () => {
    do_not_optimize(lodash.at(data, indices));
  });

  bench('Array.prototype.at', () => {
    do_not_optimize(indices.map(i => data.at(i)));
  });
});

group('at/largeArray', () => {
  const largeData = Array.from({ length: 10000 }, (_, i) => i);
  const largeIndices = Array.from({ length: 1000 }, (_, i) => i * 2);

  bench('es-toolkit/at', () => {
    do_not_optimize(atToolkit(largeData, largeIndices));
  });

  bench('es-toolkit/compat/at', () => {
    do_not_optimize(atToolkitCompat(largeData, largeIndices));
  });

  bench('lodash/at', () => {
    do_not_optimize(lodash.at(largeData, largeIndices));
  });

  bench('Array.prototype.at', () => {
    do_not_optimize(largeIndices.map(i => largeData.at(i)));
  });
});
