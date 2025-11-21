# isEqualWith

Checks if two values are equal using a custom comparison function.

```typescript
const result = isEqualWith(a, b, areValuesEqual);
```

## Usage

### `isEqualWith(a, b, areValuesEqual)`

Use `isEqualWith` when you need special comparison logic. If the custom function returns `true` or `false`, that result is used; if it returns `undefined`, the default comparison method is used. Useful for case-insensitive comparison, excluding specific properties, approximate value comparison, etc.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// Case-insensitive string comparison
const caseInsensitiveCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', caseInsensitiveCompare); // true
isEqualWith({ name: 'Alice' }, { name: 'ALICE' }, caseInsensitiveCompare); // true
```

Can also be used for approximate number comparison.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// Floating-point error tolerance comparison
const approximateCompare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.01; // Treat differences under 0.01 as equal
  }
};

isEqualWith(0.1 + 0.2, 0.3, approximateCompare); // true
isEqualWith({ price: 10.01 }, { price: 10.02 }, approximateCompare); // true
```

Useful when you want to ignore specific properties during comparison.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// Ignoring specific properties during comparison
const ignoreTimestamp = (a, b, property) => {
  if (property === 'timestamp') {
    return true; // Always treat timestamp property as equal
  }
};

const obj1 = { id: 1, name: 'Test', timestamp: 1000 };
const obj2 = { id: 1, name: 'Test', timestamp: 2000 };
isEqualWith(obj1, obj2, ignoreTimestamp); // true
```

Can implement complex custom comparison logic.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

const areValuesEqual = (a, b, property) => {
  // Ignore ID
  if (property === 'id') {
    return true;
  }

  // Compare name case-insensitively
  if (property === 'name' && typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }

  // Use default comparison for the rest
  return undefined;
};

const user1 = { id: 1, name: 'Alice', age: 25 };
const user2 = { id: 999, name: 'ALICE', age: 25 };
isEqualWith(user1, user2, areValuesEqual); // true
```

#### Parameters

- `a` (`unknown`): The first value to compare.
- `b` (`unknown`): The second value to compare.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): A custom comparison function. If it returns `true` or `false`, that result is used; if it returns `undefined`, the default comparison method is used.

#### Returns

(`boolean`): Returns `true` if the two values are equal according to the custom criteria, `false` otherwise.
