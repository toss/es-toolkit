import { getTag } from '../../_internal/getTag.ts';
import { isPrimitive } from '../../predicate/isPrimitive.ts';
import {
  argumentsTag,
  arrayBufferTag,
  arrayTag,
  booleanTag,
  dataViewTag,
  dateTag,
  float32ArrayTag,
  float64ArrayTag,
  int8ArrayTag,
  int16ArrayTag,
  int32ArrayTag,
  mapTag,
  numberTag,
  objectTag,
  regexpTag,
  setTag,
  stringTag,
  symbolTag,
  uint8ArrayTag,
  uint8ClampedArrayTag,
  uint16ArrayTag,
  uint32ArrayTag,
} from '../_internal/tags.ts';
import { isArray } from '../predicate/isArray.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

/**
 * Creates a shallow clone of the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @returns {T} - A shallow clone of the given object.
 *
 * @example
 * // Clone a primitive objs
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num) ; // true
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 */
export function clone<T>(obj: T): T {
  if (isPrimitive(obj)) {
    return obj;
  }

  const tag = getTag(obj);

  if (!isCloneableObject(obj)) {
    return {} as T;
  }

  if (isArray(obj)) {
    const result = Array.from(obj as any) as any;

    // eslint-disable-next-line prefer-object-has-own
    if (obj.length > 0 && typeof obj[0] === 'string' && Object.prototype.hasOwnProperty.call(obj, 'index')) {
      result.index = (obj as any).index;
      result.input = (obj as any).input;
    }

    return result;
  }

  if (isTypedArray(obj)) {
    const typedArray = obj as unknown as ArrayBufferView;
    const Ctor = typedArray.constructor as any;
    return new Ctor(typedArray.buffer, typedArray.byteOffset, (typedArray as any).length) as any;
  }

  if (tag === arrayBufferTag) {
    return new ArrayBuffer((obj as unknown as ArrayBuffer).byteLength) as any;
  }

  if (tag === dataViewTag) {
    const dataView = obj as unknown as DataView;
    const buffer = dataView.buffer;
    const byteOffset = dataView.byteOffset;
    const byteLength = dataView.byteLength;

    const clonedBuffer = new ArrayBuffer(byteLength);
    const srcView = new Uint8Array(buffer, byteOffset, byteLength);
    const destView = new Uint8Array(clonedBuffer);
    destView.set(srcView);

    return new DataView(clonedBuffer) as any;
  }

  if (tag === booleanTag || tag === numberTag || tag === stringTag) {
    const Ctor = (obj as any).constructor;
    const clone = new Ctor((obj as any).valueOf()) as any;

    if (tag === stringTag) {
      cloneStringObjectProperties(clone, obj as any);
    } else {
      copyOwnProperties(clone, obj as any);
    }

    return clone;
  }

  if (tag === dateTag) {
    return new Date(Number(obj as unknown as Date)) as any;
  }

  if (tag === regexpTag) {
    const regExp = obj as unknown as RegExp;
    const clone = new RegExp(regExp.source, regExp.flags) as any;
    clone.lastIndex = regExp.lastIndex;
    return clone;
  }

  if (tag === symbolTag) {
    return Object(Symbol.prototype.valueOf.call(obj)) as any;
  }

  if (tag === mapTag) {
    const map = obj as unknown as Map<any, any>;
    const result = new Map();

    map.forEach((obj, key) => {
      result.set(key, obj);
    });

    return result as unknown as T;
  }

  if (tag === setTag) {
    const set = obj as unknown as Set<any>;
    const result = new Set();

    set.forEach(obj => {
      result.add(obj);
    });

    return result as unknown as T;
  }

  if (tag === argumentsTag) {
    const args = obj as any;
    const result = {} as any;

    copyOwnProperties(result, args);

    result.length = args.length;
    result[Symbol.iterator] = args[Symbol.iterator];

    return result as T;
  }

  const result = {} as any;

  copyPrototype(result, obj);
  copyOwnProperties(result, obj);
  copySymbolProperties(result, obj);

  return result;
}

function isCloneableObject(object: any): boolean {
  switch (getTag(object)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag: {
      return true;
    }
    default: {
      return false;
    }
  }
}

function copyOwnProperties(target: any, source: any): void {
  for (const key in source) {
    // eslint-disable-next-line prefer-object-has-own
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
}

function copySymbolProperties(target: any, source: any): void {
  const symbols = Object.getOwnPropertySymbols(source);
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
      target[symbol] = source[symbol];
    }
  }
}

function cloneStringObjectProperties(target: any, source: any): void {
  const stringLength = source.valueOf().length;

  for (const key in source) {
    if (
      // eslint-disable-next-line prefer-object-has-own
      Object.prototype.hasOwnProperty.call(source, key) &&
      (Number.isNaN(Number(key)) || Number(key) >= stringLength)
    ) {
      target[key] = source[key];
    }
  }
}

function copyPrototype(target: any, source: any): void {
  const proto = Object.getPrototypeOf(source);
  if (proto !== null) {
    const Ctor = source.constructor;
    if (typeof Ctor === 'function') {
      Object.setPrototypeOf(target, proto);
    }
  }
}
