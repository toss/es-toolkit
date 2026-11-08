import { isNative as isNativeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isNative', () => {
  bench('es-toolkit/isNative', () => {
    // Native functions
    do_not_optimize(isNativeToolkit(Array.prototype.push));
    do_not_optimize(isNativeToolkit(Object.keys));
    do_not_optimize(isNativeToolkit(Math.max));
    do_not_optimize(isNativeToolkit(Promise));
    do_not_optimize(isNativeToolkit(Uint8Array));

    // Non-native values
    do_not_optimize(isNativeToolkit(undefined));
    do_not_optimize(isNativeToolkit(null));
    do_not_optimize(isNativeToolkit({}));
    do_not_optimize(isNativeToolkit([]));
    do_not_optimize(isNativeToolkit(() => {}));
  });

  bench('lodash/isNative', () => {
    // Native functions
    do_not_optimize(lodash.isNative(Array.prototype.push));
    do_not_optimize(lodash.isNative(Object.keys));
    do_not_optimize(lodash.isNative(Math.max));
    do_not_optimize(lodash.isNative(Promise));
    do_not_optimize(lodash.isNative(Uint8Array));

    // Non-native values
    do_not_optimize(lodash.isNative(undefined));
    do_not_optimize(lodash.isNative(null));
    do_not_optimize(lodash.isNative({}));
    do_not_optimize(lodash.isNative([]));
    do_not_optimize(lodash.isNative(() => {}));
  });
});
