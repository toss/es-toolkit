# sumBy (for `BigInt`s)

Returns the sum of the `BigInt`s that a function derives from each element of an array.

```typescript
const total = sumBy(items, getValue);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `sumBy(items, getValue)`

Use `sumBy` when the `BigInt`s you want to add up are inside objects. Pass a function that pulls the value out of each element, and it adds up everything that function returns.

```typescript
import { sumBy } from 'es-toolkit/bigint';

// Sum a field of each object
const accounts = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];
const total = sumBy(accounts, account => account.balance);
console.log(total); // 60n

// The index is passed as the second argument
const weights = sumBy(['a', 'b', 'c'], (_, index) => BigInt(index));
console.log(weights); // 3n
```

An empty array returns `0n`, and values can be negative.

```typescript
import { sumBy } from 'es-toolkit/bigint';

console.log(sumBy([], () => 1n)); // 0n

const entries = [{ amount: -500n }, { amount: 1200n }, { amount: -200n }];
console.log(sumBy(entries, entry => entry.amount)); // 500n
```

#### Parameters

- `items` (`readonly T[]`): The array of elements to sum.
- `getValue` (`(element: T, index: number) => bigint`): A function that returns the `BigInt` to add for each element.

#### Returns

(`bigint`): Returns the sum of every value returned by `getValue`. Returns `0n` for empty arrays.
