# reduceAsync

Reduces an array to a single value using an async reducer function.

```typescript
const result = await reduceAsync(array, reducer, initialValue);
```

## Reference

### `reduceAsync(array, reducer, initialValue)`

Use `reduceAsync` to reduce an array to a single value by processing each element sequentially. The reducer function is applied sequentially to each element from left to right, passing the accumulated result from one call to the next.

```typescript
import { reduceAsync } from 'es-toolkit/array';

// Fetch async values for each number and sum them.
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + (await fetchValue(n)), 0);
// Returns: Sum of all fetched values

// Transform array to object.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userMap = await reduceAsync(
  users,
  async (acc, user) => {
    const details = await fetchUserDetails(user.id);
    acc[user.id] = details;
    return acc;
  },
  {} as Record<number, any>
);
// Returns: { 1: {...}, 2: {...}, 3: {...} }
```

Unlike other async array methods, `reduceAsync` must process elements sequentially and does not support concurrent execution, because the result from the previous step is needed for the next step.

#### Parameters

- `array` (`readonly T[]`): The array to reduce.
- `reducer` (`(accumulator: U, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<U>`): An async function that processes each element. It receives the accumulated value and current value, and returns the new accumulated value.
- `initialValue` (`U`): The initial value of the accumulator.

#### Returns

(`Promise<U>`): A promise that resolves to the final accumulated value.

---

### `reduceAsync(array, reducer)`

When reducing an array without an initial value, the first element is used as the initial value and the reducer function is applied starting from the second element.

```typescript
import { reduceAsync } from 'es-toolkit/array';

// Calculate sum without initial value.
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + n);
// Returns: 15 (1 + 2 + 3 + 4 + 5)

// Empty array returns undefined.
const emptyArray: number[] = [];
const result = await reduceAsync(emptyArray, async (acc, n) => acc + n);
// Returns: undefined
```

Calling `reduceAsync` on an empty array without an initial value returns `undefined`.

#### Parameters

- `array` (`readonly T[]`): The array to reduce.
- `reducer` (`(accumulator: T, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<T>`): An async function that processes each element. It receives the accumulated value and current value, and returns the new accumulated value.

#### Returns

(`Promise<T | undefined>`): A promise that resolves to the final accumulated value. Returns `undefined` if the array is empty.
