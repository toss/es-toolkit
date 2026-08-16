# minBy (for `BigInt`s)

Returns the element of an array whose derived `BigInt` value is the smallest.

```typescript
const smallest = minBy(items, getValue);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `minBy(items, getValue)`

Use `minBy` when the `BigInt`s you want to compare are inside objects and you want the whole object back, not just the number. Pass a function that pulls the value out of each element.

```typescript
import { minBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const poorest = minBy(accounts, account => account.balance);
console.log(poorest); // { owner: 'alice', balance: 10n }
```

When several elements tie for the smallest value, the first one wins. `getValue` also receives the index and the whole array.

```typescript
import { minBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 10n };
const second = { id: 'b', score: 10n };
console.log(minBy([first, second], item => item.score)); // { id: 'a', score: 10n }
```

An empty array has no element to return, so it throws.

```typescript
import { minBy } from 'es-toolkit/bigint';

minBy([], () => 0n); // RangeError: Cannot find the minimum of an empty array.
```

#### Parameters

- `items` (`readonly T[]`): The array of elements to search.
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): A function that returns the `BigInt` to compare by.

#### Returns

(`T`): Returns the element with the smallest derived `BigInt`. Returns the first of several elements that tie.

#### Throws

Throws a `RangeError` if the array is empty.
