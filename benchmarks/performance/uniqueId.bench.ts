import { uniqueId as uniqueIdToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('uniqueId', () => {
  bench('es-toolkit/compat/uniqueId', () => {
    do_not_optimize(uniqueIdToolkitCompat());
    do_not_optimize(uniqueIdToolkitCompat());
    do_not_optimize(uniqueIdToolkitCompat());
    do_not_optimize(uniqueIdToolkitCompat());
    do_not_optimize(uniqueIdToolkitCompat());
    do_not_optimize(uniqueIdToolkitCompat('prefix_'));
    do_not_optimize(uniqueIdToolkitCompat('prefix_'));
    do_not_optimize(uniqueIdToolkitCompat('prefix_'));
    do_not_optimize(uniqueIdToolkitCompat('prefix_'));
    do_not_optimize(uniqueIdToolkitCompat('prefix_'));
  });

  bench('lodash/uniqueId', () => {
    do_not_optimize(lodash.uniqueId());
    do_not_optimize(lodash.uniqueId());
    do_not_optimize(lodash.uniqueId());
    do_not_optimize(lodash.uniqueId());
    do_not_optimize(lodash.uniqueId());
    do_not_optimize(lodash.uniqueId('prefix_'));
    do_not_optimize(lodash.uniqueId('prefix_'));
    do_not_optimize(lodash.uniqueId('prefix_'));
    do_not_optimize(lodash.uniqueId('prefix_'));
    do_not_optimize(lodash.uniqueId('prefix_'));
  });
});
