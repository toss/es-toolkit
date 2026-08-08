# sum (for `BigInt`s)

Returns the sum of all elements in an array of `BigInt`s.

```typescript
const total = sum(numbers);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `sum(nums)`

Use `sum` when you want to add up `BigInt`s. It adds every element of the array together and returns the total.

```typescript
import { sum } from 'es-toolkit/bigint';

// Basic sum
const numbers = [1n, 2n, 3n, 4n, 5n];
const total = sum(numbers);
console.log(total); // 15n

// Negative and positive values mixed
const values = [-10n, 5n, -3n, 8n];
const result = sum(values);
console.log(result); // 0n
```

An empty array returns `0n`, so splitting an array and summing the parts always gives the same answer as summing the whole.

```typescript
import { sum } from 'es-toolkit/bigint';

const empty = sum([]);
console.log(empty); // 0n

const first = [1n, 2n];
const second = [3n, 4n];
console.log(sum(first) + sum(second) === sum([...first, ...second])); // true
```

Unlike `number`, `BigInt` stays exact no matter how large the values get, which makes it a good fit for money in the smallest currency unit, token amounts, or database identifiers.

```typescript
import { sum } from 'es-toolkit/bigint';

// Well past Number.MAX_SAFE_INTEGER, still exact
const balances = [9007199254740993n, 9007199254740993n];
console.log(sum(balances)); // 18014398509481986n

// Total of payments stored in the smallest currency unit
const paymentsInCents = [129999n, 4550n, 87500n];
console.log(sum(paymentsInCents)); // 222049n
```

#### Parameters

- `nums` (`readonly bigint[]`): The array of `BigInt`s to sum.

#### Returns

(`bigint`): Returns the sum of all `BigInt`s in the array. Returns `0n` for empty arrays.
