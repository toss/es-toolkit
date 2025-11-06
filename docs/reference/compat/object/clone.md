# clone (Lodash compatibility)

::: warning Use `clone` from `es-toolkit` instead

This `clone` function is relatively slow due to complex logic that handles special object types.

Use the faster and more modern [clone](../../object/clone.md) from `es-toolkit` instead.

:::

Creates a shallow copy of an object.

```typescript
const cloned = clone(value);
```

## Usage

### `clone(value)`

Use `clone` when you want to create a shallow copy of a value. It can copy various types of objects and primitive values.

```typescript
import { clone } from 'es-toolkit/compat';

// Copying primitive values
const num = 42;
const clonedNum = clone(num);
// Returns: 42 (same value)

// Copying arrays
const arr = [1, 2, 3];
const clonedArr = clone(arr);
// Returns: [1, 2, 3] (new array instance)

// Copying objects
const obj = { a: 1, b: 'hello' };
const clonedObj = clone(obj);
// Returns: { a: 1, b: 'hello' } (new object instance)

// Copying Date objects
const date = new Date('2023-01-01');
const clonedDate = clone(date);
// Returns: new Date('2023-01-01') (new Date instance)

// Copying regular expressions
const regex = /hello/gi;
regex.lastIndex = 3;
const clonedRegex = clone(regex);
// Returns: /hello/gi with lastIndex = 3

// Copying Map
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
const clonedMap = clone(map);
// Returns: new Map([['a', 1], ['b', 2]])

// Copying Set
const set = new Set([1, 2, 3]);
const clonedSet = clone(set);
// Returns: new Set([1, 2, 3])
```

Nested objects are only shallowly copied.

```typescript
import { clone } from 'es-toolkit/compat';

const nested = {
  a: 1,
  b: {
    c: 2,
  },
};
const clonedNested = clone(nested);

console.log(clonedNested !== nested); // true (different objects)
console.log(clonedNested.b === nested.b); // true (nested objects have same reference)
```

#### Parameters

- `value` (`T`): The value to clone.

#### Returns

(`T`): Returns the cloned value.
