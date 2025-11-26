# isSet

Checks if a given value is a `Set` instance.

```typescript
const result = isSet(value);
```

## Usage

### `isSet(value)`

Use `isSet` when you want to check if a value is a `Set` instance. It's useful for distinguishing `Set` objects from other objects.

```typescript
import { isSet } from 'es-toolkit/predicate';

// Set instances
const set1 = new Set();
const set2 = new Set([1, 2, 3]);
const set3 = new Set(['a', 'b', 'c']);

console.log(isSet(set1)); // true
console.log(isSet(set2)); // true
console.log(isSet(set3)); // true

// Non-Set values
console.log(isSet(new Map())); // false
console.log(isSet(new WeakSet())); // false
console.log(isSet([])); // false
console.log(isSet({})); // false
console.log(isSet(null)); // false
console.log(isSet(undefined)); // false
```

Useful when executing different logic for JavaScript built-in objects like `Set`, `Array`, and `Map`.

```typescript
// Calculate collection size
function getCollectionSize(collection: unknown): number {
  if (isSet(collection)) {
    // TypeScript infers collection as Set<any>
    return collection.size;
  }

  if (Array.isArray(collection)) {
    return collection.length;
  }

  if (collection && typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}

// Usage examples
console.log(getCollectionSize(new Set([1, 2, 3]))); // 3
console.log(getCollectionSize([1, 2, 3])); // 3
console.log(getCollectionSize({ a: 1, b: 2 })); // 2

// Deduplication utility
function removeDuplicates(data: unknown) {
  if (isSet(data)) {
    // Already a Set, return as is
    return data;
  }

  if (Array.isArray(data)) {
    return new Set(data);
  }

  // Don't convert other types
  return data;
}

const duplicatedArray = [1, 2, 2, 3, 3, 3];
const uniqueSet = removeDuplicates(duplicatedArray);
console.log(uniqueSet); // Set { 1, 2, 3 }

const existingSet = new Set(['a', 'b']);
console.log(removeDuplicates(existingSet)); // Set { 'a', 'b' } (same Set returned)
```

Can also be used extensively in Set manipulation and data transformation.

```typescript
// Universal collection merging
function mergeCollections(...collections: unknown[]): Set<any> {
  const result = new Set();

  for (const collection of collections) {
    if (isSet(collection)) {
      // Add all values from Set to result
      for (const item of collection) {
        result.add(item);
      }
    } else if (Array.isArray(collection)) {
      // Add all values from array
      for (const item of collection) {
        result.add(item);
      }
    }
  }

  return result;
}

// Usage examples
const set1 = new Set([1, 2, 3]);
const array1 = [3, 4, 5];
const set2 = new Set(['a', 'b']);

const merged = mergeCollections(set1, array1, set2);
console.log(merged); // Set { 1, 2, 3, 4, 5, 'a', 'b' }

// Calculate collection intersection
function getIntersection(coll1: unknown, coll2: unknown): Set<any> {
  const set1 = isSet(coll1) ? coll1 : new Set(Array.isArray(coll1) ? coll1 : []);
  const set2 = isSet(coll2) ? coll2 : new Set(Array.isArray(coll2) ? coll2 : []);

  const intersection = new Set();

  for (const item of set1) {
    if (set2.has(item)) {
      intersection.add(item);
    }
  }

  return intersection;
}

// Usage examples
const setA = new Set([1, 2, 3, 4]);
const arrayB = [3, 4, 5, 6];

const intersection = getIntersection(setA, arrayB);
console.log(intersection); // Set { 3, 4 }
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Set instance.

#### Returns

(`boolean`): Returns `true` if the value is a Set instance, `false` otherwise.
