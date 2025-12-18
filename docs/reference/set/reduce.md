# reduce (for `Set`s)

Reduces a Set to a single value by iterating through its elements and applying a callback function.

```typescript
const result = reduce(set, callback, initialValue);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `reduce(set, callback, initialValue?)`

Use `reduce` when you want to transform a Set into a single value by accumulating results from each element. Provide a callback function that processes each element and updates the accumulator. If an initial value is provided, it is used as the starting accumulator value. If no initial value is provided and the Set is empty, a TypeError is thrown.

```typescript
import { reduce } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = reduce(set, (acc, value) => acc + value, 0);
// Result: 6
```

You can reduce a Set in various ways.

```typescript
import { reduce } from 'es-toolkit/set';

// Sum with initial value
const numbers = new Set([10, 20, 30, 40]);

const total = reduce(numbers, (acc, num) => acc + num, 0);
// Result: 100

// Without initial value (uses first element)
const values = new Set([5, 10]);

const sum = reduce(values, (acc, value) => acc + value);
// Result: 15 (starts with first value 5)

// Build an array from Set
const uniqueNames = new Set(['Alice', 'Bob', 'Charlie']);

const nameList = reduce(
  uniqueNames,
  (acc, name) => [...acc, name.toUpperCase()],
  [] as string[]
);
// Result: ['ALICE', 'BOB', 'CHARLIE']
```

#### Parameters

- `set` (`Set<T>`): The Set to reduce.
- `callback` (`(accumulator: A, value: T, value2: T, set: Set<T>) => A`): A function that processes each element and updates the accumulator.
- `initialValue` (`A`, optional): The initial value for the accumulator. If not provided, the first element in the Set is used.

#### Returns

(`A`): The final accumulated value.

#### Throws

(`TypeError`): If the Set is empty and no initial value is provided.
