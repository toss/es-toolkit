# transform (Lodash Compatibility)

::: warning Use `reduce` or `Object.entries` instead

This `transform` function operates slowly due to complex internal logic. In most cases, it can be implemented more simply using JavaScript's built-in methods.

Use faster and more modern `reduce` or `Object.entries` instead.

:::

Iterates over an array or object, accumulating values in an accumulator to create a new value.

```typescript
const result = transform(object, iteratee, accumulator);
```

## Usage

### `transform(object, iteratee, accumulator)`

Use `transform` when you want to iterate over each element of an array or object, accumulating values in an accumulator. The iteration stops when the `iteratee` function returns `false`.

```typescript
import { transform } from 'es-toolkit/compat';

// Transform an array
const numbers = [2, 3, 4];
const doubled = transform(
  numbers,
  (acc, value) => {
    acc.push(value * 2);
  },
  []
);
// Returns: [4, 6, 8]

// Transform an object
const obj = { a: 1, b: 2, c: 1 };
const grouped = transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
);
// Returns: { '1': ['a', 'c'], '2': ['b'] }
```

If accumulator is omitted, an empty array or empty object is automatically created.

```typescript
import { transform } from 'es-toolkit/compat';

// Empty array is created for arrays
const result1 = transform([1, 2, 3], (acc, value) => {
  acc.push(value * 2);
});
// Returns: [2, 4, 6]

// Empty object is created for objects
const result2 = transform({ a: 1, b: 2 }, (acc, value, key) => {
  acc[key] = value * 2;
});
// Returns: { a: 2, b: 4 }
```

You can stop the iteration by returning `false` in the `iteratee` function.

```typescript
import { transform } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
const result = transform(
  numbers,
  (acc, value) => {
    if (value > 3) {
      return false; // Stop iteration
    }
    acc.push(value * 2);
  },
  []
);
// Returns: [2, 4, 6] (4 and 5 are not processed)
```

If the `iteratee` function is omitted, it returns an empty object or array.

```typescript
import { transform } from 'es-toolkit/compat';

const array = [1, 2, 3];
const copy1 = transform(array);
// Returns: []

const obj = { a: 1, b: 2 };
const copy2 = transform(obj);
// Returns: {}
```

#### Parameters

- `object` (`readonly T[] | T`, optional): The array or object to iterate over.
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown`, optional): The function to execute for each element. Returning `false` stops the iteration. Default is the `identity` function.
- `accumulator` (`U`, optional): The initial value. If omitted, an empty array is created for arrays, and an empty object for objects.

#### Returns

(`U | any[] | Record<string, any>`): Returns the accumulated result.
