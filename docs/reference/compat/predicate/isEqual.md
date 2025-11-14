# isEqual (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isEqual](../../predicate/isEqual.md)

This `isEqual` function operates slowly due to complex handling for Lodash compatibility.

Instead, use the faster and modern [isEqual](../../predicate/isEqual.md) from `es-toolkit`.

:::

Performs a deep comparison between two values to determine if they are equal.

```typescript
const result = isEqual(value1, value2);
```

## Usage

### `isEqual(a, b)`

Use `isEqual` when you want to perform a deep comparison between two values. It compares complex types like Date, RegExp, objects, and arrays by their content.

```typescript
import { isEqual } from 'es-toolkit/compat';

// Basic type comparison
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// Object deep comparison
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
isEqual({ a: 1 }, { a: 1, b: undefined }); // false

// Array deep comparison
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, [2, 3]], [1, [2, 3]]); // true

// Date object comparison
isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
isEqual(new Date('2020-01-01'), new Date('2020-01-02')); // false

// RegExp object comparison
isEqual(/abc/g, /abc/g); // true
isEqual(/abc/g, /abc/i); // false
```

It also recursively compares nested objects and arrays.

```typescript
import { isEqual } from 'es-toolkit/compat';

const obj1 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

const obj2 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

isEqual(obj1, obj2); // true
```

#### Parameters

- `a` (`unknown`): The first value to compare.
- `b` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the values are equal, otherwise `false`.
