import { isNative as isNativeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isNative', () => {
  bench('es-toolkit/isNative', () => {
    // Native functions
    isNativeToolkit(Array.prototype.push);
    isNativeToolkit(Object.keys);
    isNativeToolkit(Math.max);
    isNativeToolkit(Promise);
    isNativeToolkit(Uint8Array);

    // Non-native values
    isNativeToolkit(undefined);
    isNativeToolkit(null);
    isNativeToolkit({});
    isNativeToolkit([]);
    isNativeToolkit(() => {});
  });

  bench('lodash/isNative', () => {
    // Native functions
    lodash.isNative(Array.prototype.push);
    lodash.isNative(Object.keys);
    lodash.isNative(Math.max);
    lodash.isNative(Promise);
    lodash.isNative(Uint8Array);

    // Non-native values
    lodash.isNative(undefined);
    lodash.isNative(null);
    lodash.isNative({});
    lodash.isNative([]);
    lodash.isNative(() => {});
  });
});
