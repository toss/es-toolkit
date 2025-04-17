import { isFunction } from '../../predicate';

export function wrap<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wrapper: (fn: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T> {
  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const wrapFn = isFunction(wrapper)
      ? wrapper
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (value: T, ..._args: Parameters<T>) => value as unknown as ReturnType<T>;

    return wrapFn.apply(this, [fn, ...args] as [T, ...Parameters<T>]);
  };
}
