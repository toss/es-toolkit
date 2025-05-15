/**
 * Binds methods of an object to the object itself, overwriting the existing method.
 * Method names may be specified as individual arguments or as arrays of method names.
 *
 * @template T - Type of the object with methods to bind.
 * @param {T} object - The object to bind methods to.
 * @param {...(string|string[])} methodNames - The method names to bind, specified individually or in arrays.
 * @returns {T} - Returns the object with bound methods.
 *
 * @example
 * const view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 */
export function bindAll<T extends { [key: string]: unknown }>(
  object: T,
  ...methodNames: Array<string | string[] | number | IArguments>
): T {
  if (Array.isArray(object) && methodNames.length === 0) {
    return object;
  }

  const bindValue = (obj: { [key: string]: unknown }, key: string) => {
    const value = obj[key];
    if (typeof value === 'function') {
      obj[key] = value.bind(obj);
    }
  };

  methodNames.forEach(name => {
    if (Array.isArray(name)) {
      name.forEach(key => bindValue(object, String(key)));
    } else if (typeof name === 'number') {
      const key = Object.is(name, -0) ? '-0' : String(name);
      bindValue(object, key);
    } else if (name && typeof name === 'object' && 'length' in name) {
      Array.from(name).forEach(key => bindValue(object, String(key)));
    } else if (name) {
      bindValue(object, String(name));
    }
  });

  return object;
}
