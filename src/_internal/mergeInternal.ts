import { isUnsafeProperty } from './isUnsafeProperty.ts';
import { clone } from '../object/clone.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

export type MergeArray = unknown[];
export type MergeObject = Record<PropertyKey, unknown>;
export type MergeInput = MergeObject | MergeArray;
type MergeContainer = Record<string, unknown>;

export type MergeRuntimeCustomizer = (
  targetValue: unknown,
  sourceValue: unknown,
  key: string,
  target: MergeInput,
  source: MergeInput
) => unknown;

export function isMergeArray(value: unknown): value is MergeArray {
  return Array.isArray(value);
}

export function isMergeObject(value: unknown): value is MergeObject {
  return isPlainObject(value);
}

export function mergeInto<T extends MergeInput>(target: T, source: MergeInput): T {
  const targetContainer = target as MergeContainer;
  const sourceContainer = source as MergeContainer;
  const sourceKeys = Object.keys(sourceContainer);

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    if (isUnsafeProperty(key)) {
      continue;
    }

    const sourceValue = sourceContainer[key];
    const targetValue = targetContainer[key];
    const sourceIsArray = isMergeArray(sourceValue);
    const sourceIsObject = isMergeObject(sourceValue);
    const targetIsArray = isMergeArray(targetValue);
    const targetIsObject = isMergeObject(targetValue);

    if ((sourceIsArray || sourceIsObject) && (targetIsArray || targetIsObject)) {
      targetContainer[key] = mergeInto(targetValue as MergeInput, sourceValue as MergeInput);
    } else if (sourceIsArray) {
      targetContainer[key] = mergeInto([], sourceValue);
    } else if (sourceIsObject) {
      targetContainer[key] = mergeInto({}, sourceValue);
    } else if (targetValue === undefined || sourceValue !== undefined) {
      targetContainer[key] = sourceValue;
    }
  }

  return target;
}

export function mergeWithInto<T extends MergeInput>(target: T, source: MergeInput, merge: MergeRuntimeCustomizer): T {
  const targetContainer = target as MergeContainer;
  const sourceContainer = source as MergeContainer;
  const sourceKeys = Object.keys(sourceContainer);

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    if (isUnsafeProperty(key)) {
      continue;
    }

    const sourceValue = sourceContainer[key];
    const targetValue = targetContainer[key];
    const merged = merge(targetValue, sourceValue, key, target, source);

    if (merged !== undefined) {
      targetContainer[key] = merged;
    } else if (isMergeArray(sourceValue)) {
      const nextTarget = isMergeArray(targetValue) ? targetValue : [];
      targetContainer[key] = mergeWithInto(nextTarget, sourceValue, merge);
    } else if (isMergeObject(sourceValue)) {
      const nextTarget = isMergeObject(targetValue) ? targetValue : {};
      targetContainer[key] = mergeWithInto(nextTarget, sourceValue, merge);
    } else if (targetValue === undefined || sourceValue !== undefined) {
      targetContainer[key] = sourceValue;
    }
  }

  return target;
}

export function toMergedInto(target: MergeInput, source: MergeInput): MergeInput {
  function mergeRecursively(targetValue: unknown, sourceValue: unknown): unknown {
    if (isMergeArray(sourceValue)) {
      return isMergeArray(targetValue)
        ? mergeWithInto(clone(targetValue), sourceValue, mergeRecursively)
        : mergeWithInto([], sourceValue, mergeRecursively);
    }

    if (isMergeObject(sourceValue)) {
      return isMergeObject(targetValue)
        ? mergeWithInto(clone(targetValue), sourceValue, mergeRecursively)
        : mergeWithInto({}, sourceValue, mergeRecursively);
    }

    return undefined;
  }

  return mergeWithInto(clone(target), source, mergeRecursively);
}
