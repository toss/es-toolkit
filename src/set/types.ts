/**
 * Common type for objects that can be converted to Set
 */
export type SetLike<T> = Set<T> | readonly T[];

/**
 * Type guard to check if an object is a Set
 */
export function isSet<T>(input: SetLike<T>): input is Set<T> {
  return input instanceof Set;
}

/**
 * Ensure an object is a Set
 */
export function ensureSet<T>(input: SetLike<T>): Set<T> {
  return isSet(input) ? input : new Set(input);
}

/**
 * Check if native Set methods are available
 */
export function hasNativeSetMethods(): boolean {
  return (
    typeof Set.prototype.intersection === 'function' &&
    typeof Set.prototype.union === 'function' &&
    typeof Set.prototype.difference === 'function' &&
    typeof Set.prototype.symmetricDifference === 'function'
  );
}

/**
 * Check if native Set methods are working correctly
 */
export function hasWorkingSetMethods(): boolean {
  try {
    const testSet1 = new Set([1, 2]);
    const testSet2 = new Set([2, 3]);
    const result = (testSet1 as Set<number>).intersection?.(testSet2);
    return result instanceof Set && result.has(2) && result.size === 1;
  } catch {
    return false;
  }
}

/**
 * ECMAScript 2025 Set Types
 */
declare global {
  interface Set<T> {
    intersection(other: Set<T>): Set<T>;
    union(other: Set<T>): Set<T>;
    difference(other: Set<T>): Set<T>;
    symmetricDifference(other: Set<T>): Set<T>;
    isSubsetOf(other: Set<T>): boolean;
    isSupersetOf(other: Set<T>): boolean;
    isDisjointFrom(other: Set<T>): boolean;
  }
}
