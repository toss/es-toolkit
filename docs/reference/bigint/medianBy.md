# medianBy (for `BigInt`s)

Returns the middle of the `BigInt`s that a function derives from each element of an array.

```typescript
const middle = medianBy(items, getValue);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `medianBy(items, getValue)`

Use `medianBy` when the `BigInt`s you want the median of are inside objects. Pass a function that pulls the value out of each element, and it takes the median of everything that function returns.

```typescript
import { medianBy } from 'es-toolkit/bigint';

const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];
const middle = medianBy(accounts, account => account.balance);
console.log(middle); // 20n
```

Just like `median`, an even number of elements averages the two middle values and truncates toward zero, and an empty array throws.

```typescript
import { medianBy } from 'es-toolkit/bigint';

const payments = [{ amount: 1n }, { amount: 2n }, { amount: 3n }, { amount: 4n }];
console.log(medianBy(payments, payment => payment.amount)); // 2n

medianBy([], () => 0n); // RangeError: Cannot compute the median of an empty array.
```

#### Parameters

- `items` (`readonly T[]`): The array of elements to calculate the median of.
- `getValue` (`(element: T) => bigint`): A function that returns the `BigInt` to use for each element.

#### Returns

(`bigint`): Returns the median of every value returned by `getValue`. For an even number of elements, returns the average of the two middle values, truncated toward zero.

#### Throws

Throws a `RangeError` if the array is empty.
