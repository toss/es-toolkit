import { isArray } from '../compat';
import { isBlob, isBoolean, isDate, isFile, isNull, isSymbol, isUndefined } from '../predicate';

const formDataOptions = {
  allowEmptyArrays: false,
  convertBooleansToIntegers: false,
  ignoreNullValues: false,
  noArrayNotationForFiles: false,
  noArrayNotationForNonFiles: false,
  useDotNotationForObjects: false,
};

/**
 * Converts an object into a FormData instance with optional configuration.
 *
 * This function recursively converts an object into FormData, handling key-value pairs, nested objects,
 * and arrays based on the provided configuration options.
 *
 * @param {Record<string, any>} data - The object to be converted into FormData.
 * @param {FormData} [formData=new FormData()] - An optional existing FormData instance to append data to.
 * @param {string} [parentKey] - An optional parent key for nested structures.
 * @param {object} [config=formDataOptions] - Configuration object that customizes FormData conversion behavior.
 *
 * Configuration options:
 * - `allowEmptyArrays` (boolean): When `true`, empty arrays are added to the FormData as empty strings. Default is `false`.
 * - `convertBooleansToIntegers` (boolean): When `true`, boolean values (`true`/`false`) are converted to `'1'` and `'0'`. Default is `false`.
 * - `ignoreNullValues` (boolean): When `true`, `null` values are omitted from the FormData. Default is `false`.
 * - `noArrayNotationForFiles` (boolean): When `true`, file arrays are added to FormData without the `[]` notation. Default is `false`.
 * - `noArrayNotationForNonFiles` (boolean): When `true`, non-file arrays are added to FormData without the `[]` notation. Default is `false`.
 * - `useDotNotationForObjects` (boolean): When `true`, nested object properties use dot notation (e.g., `parent.child`) instead of bracket notation (e.g., `parent[child]`). Default is `false`.
 *
 * @returns {FormData} A populated FormData instance.
 *
 * @throws {TypeError} If an unsupported data type (such as `Symbol`) is encountered.
 */
export function toFormData({
  data,
  parentKey,
  formData = new FormData(),
  config = formDataOptions,
}: {
  data: Record<string, any>;
  parentKey?: string;
  formData?: FormData;
  config?: Partial<typeof formDataOptions>;
}): FormData {
  if (isUndefined(data)) {
    return formData;
  }
  if (isNull(data)) {
    if (config.ignoreNullValues) {
      return formData;
    }
    if (parentKey) {
      formData.append(parentKey, '');
    }
  } else if (isBoolean(data) && parentKey) {
    const value = config.convertBooleansToIntegers ? (data ? '1' : '0') : String(data);
    formData.append(parentKey, value);
  } else if (isArray(data) && data.length === 0) {
    if (config.allowEmptyArrays && parentKey) {
      formData.append(parentKey, '');
    }
  } else if (isArray(data)) {
    data.forEach((item, index) => {
      let key = parentKey ? `${parentKey}[${index}]` : String(index);
      if (
        (config.noArrayNotationForNonFiles && !isFile(item) && !isBlob(item)) ||
        (config.noArrayNotationForFiles && (isFile(item) || isBlob(item)))
      ) {
        key = parentKey!;
      }
      toFormData({
        data: item,
        formData,
        parentKey: key,
        config,
      });
    });
  } else if (isDate(data) && parentKey) {
    formData.append(parentKey, data.toISOString());
  } else if ((isFile(data) || isBlob(data)) && parentKey) {
    formData.append(parentKey, data);
  } else if (typeof data === 'bigint' && parentKey) {
    formData.append(parentKey, (data as bigint).toString());
  } else if (isSymbol(data)) {
    throw new TypeError('Cannot serialize a symbol to FormData');
  } else if (typeof data === 'object' && !isBlob(data)) {
    for (const key in data) {
      const value = data[key];
      const formKey = parentKey
        ? config.useDotNotationForObjects
          ? `${parentKey}.${key}`
          : `${parentKey}[${key}]`
        : key;
      toFormData({
        data: value,
        formData,
        parentKey: formKey,
        config,
      });
    }
  } else if (parentKey) {
    formData.append(parentKey, String(data));
  } else {
    throw new TypeError(`Unsupported data type: ${typeof data}`);
  }
  return formData;
}
