/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
export function toArgs<T extends any[]>(array: T): T {
  return function () {
    return arguments;
  }.apply(undefined, array);
}
