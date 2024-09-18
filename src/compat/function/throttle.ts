import { debounce } from './debounce.ts';

interface ThrottleOptions {
  /**
   * An optional AbortSignal to cancel the function invocation on the trailing edge.
   */
  signal?: AbortSignal;

  /**
   * If `true`, the function will be invoked on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean;

  /**
   * If `true`, the function will be invoked on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean;
}

export function throttle<F extends (...args: any[]) => any>(
  func: F,
  throttleMs: number = 0,
  options: ThrottleOptions = {}
): ((...args: Parameters<F>) => ReturnType<F> | undefined) & {
  cancel: () => void;
  flush: () => void;
} {
  if (typeof options !== 'object') {
    options = {};
  }

  const { leading = true, trailing = true, signal } = options;

  return debounce(func, throttleMs, { leading, trailing, signal, maxWait: throttleMs });
}
