export const strictArgs = (function () {
  'use strict';

  // eslint-disable-next-line prefer-rest-params
  return arguments;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
})(1, 2, 3);
