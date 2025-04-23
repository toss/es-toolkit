import { bench, describe } from 'vitest';
import { isNative as isNativeToolkit_ } from 'es-toolkit/compat';
import { isNative as isNativeLodash_ } from 'lodash';

const isNativeToolkit = isNativeToolkit_;
const isNativeLodash = isNativeLodash_;

describe('isNative', () => {
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
    isNativeLodash(Array.prototype.push);
    isNativeLodash(Object.keys);
    isNativeLodash(Math.max);
    isNativeLodash(Promise);
    isNativeLodash(Uint8Array);

    // Non-native values
    isNativeLodash(undefined);
    isNativeLodash(null);
    isNativeLodash({});
    isNativeLodash([]);
    isNativeLodash(() => {});
  });
});
