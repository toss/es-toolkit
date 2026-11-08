import { uniqueId as uniqueIdToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('uniqueId', () => {
  bench('es-toolkit/compat/uniqueId', () => {
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
  });

  bench('lodash/uniqueId', () => {
    lodash.uniqueId();
    lodash.uniqueId();
    lodash.uniqueId();
    lodash.uniqueId();
    lodash.uniqueId();
    lodash.uniqueId('prefix_');
    lodash.uniqueId('prefix_');
    lodash.uniqueId('prefix_');
    lodash.uniqueId('prefix_');
    lodash.uniqueId('prefix_');
  });
});
