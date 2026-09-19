export function isPrototype(value: object) {
  const constructor = value == null ? undefined : value.constructor;
  const prototype = typeof constructor === 'function' ? constructor.prototype : Object.prototype;

  return value === prototype;
}
