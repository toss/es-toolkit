import { isArray } from '../compat';
import { isBlob, isBoolean, isDate, isFile, isNull, isSymbol, isUndefined } from '../predicate';

/**
 * Converts an object into a FormData instance.
 *
 * This function recursively converts an object into `FormData`, which is used in web forms to send key-value pairs.
 * It processes each key-value pair in the object and appends them to a `FormData` instance, handling nested objects
 * and arrays as well. The function intelligently creates the form data keys based on the object's structure,
 * making it suitable for handling complex, nested data.
 *
 * @param {any} data - The object to be converted into form data.
 * @param {FormData} [formData=new FormData()] - An optional existing FormData instance to append data to.
 * If not provided, a new FormData instance will be created.
 * @param {string} [parentKey] - An optional parent key for handling nested objects. This is used internally during recursion.
 * @returns {FormData} A populated FormData instance containing key-value pairs that represent the original object.
 *
 * @example
 * const obj = { name: "John", age: 30, preferences: { color: "blue", food: "pizza" } };
 * const formData = toFormData(obj);
 * // formData will contain:
 * // "name" -> "John"
 * // "age" -> "30"
 * // "preferences[color]" -> "blue"
 * // "preferences[food]" -> "pizza"
 */
export function toFormData(data: any, formData: FormData = new FormData(), parentKey?: string): FormData {
  if (isUndefined(data)) {
    return formData;
  }

  if (isNull(data) && parentKey) {
    formData.append(parentKey, '');
  } else if (isBoolean(data)) {
    formData.append(parentKey!, String(data));
  } else if (isArray(data)) {
    data.forEach((item, index) => {
      const key = parentKey ? `${parentKey}[${index}]` : String(index);
      toFormData(item, formData, key);
    });
  } else if (isDate(data)) {
    formData.append(parentKey!, data.toISOString());
  } else if (isFile(data) || isBlob(data)) {
    formData.append(parentKey!, data);
  } else if (typeof data === 'bigint') {
    formData.append(parentKey!, data.toString());
  } else if (isSymbol(data)) {
    throw new TypeError('Cannot serialize a symbol to FormData');
  } else if (typeof data === 'object' && !isBlob(data)) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      toFormData(value, formData, formKey);
    });
  } else if (parentKey) {
    formData.append(parentKey, String(data));
  }

  return formData;
}
