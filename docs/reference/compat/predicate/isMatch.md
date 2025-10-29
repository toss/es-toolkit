# isMatch (Lodash Compatibility)

Checks if an object partially matches another object's shape and values.

```typescript
const result = isMatch(target, source);
```

## Reference

### `isMatch(target, source)`

Use `isMatch` when you need to check if an object or array partially matches another object's structure and values. They don't need to be completely identical - all properties of source must exist in target with the same values.

```typescript
import { isMatch } from 'es-toolkit/compat';

// Object partial matching
isMatch({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }); // true (a, b match)
isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }); // false (c is not in target)

// Nested objects
isMatch({ user: { name: 'Alice', age: 25, city: 'Seoul' } }, { user: { name: 'Alice', age: 25 } }); // true

// Array partial matching (order independent)
isMatch([1, 2, 3, 4], [2, 4]); // true (2 and 4 are in the array)
isMatch([1, 2, 3], [1, 2, 3]); // true (complete match)
isMatch([1, 2], [1, 2, 3]); // false (3 is not in target)

// Map partial matching
const targetMap = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const sourceMap = new Map([
  ['a', 1],
  ['b', 2],
]);
isMatch(targetMap, sourceMap); // true

// Set partial matching
const targetSet = new Set([1, 2, 3, 4]);
const sourceSet = new Set([2, 4]);
isMatch(targetSet, sourceSet); // true

// Empty source always returns true
isMatch({ a: 1 }, {}); // true
isMatch([1, 2, 3], []); // true
```

More direct and faster alternatives:

```typescript
// Complete equality check (faster)
import { isEqual } from 'es-toolkit';

isEqual(obj1, obj2);

// Specific property checks (clearer)
target.a === source.a && target.b === source.b;

// Object structure check
Object.keys(source).every(key => target[key] === source[key]);
```

#### Parameters

- `target` (`unknown`): The object to check for matching.
- `source` (`unknown`): The object serving as the match pattern.

#### Returns

(`boolean`): Returns `true` if target partially matches source's shape and values, else `false`.
