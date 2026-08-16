# maxBy (for `BigInt`s)

Returns the element of an array whose derived `BigInt` value is the largest.

```typescript
const largest = maxBy(items, getValue);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `maxBy(items, getValue)`

Use `maxBy` when the `BigInt`s you want to compare are inside objects and you want the whole object back, not just the number. Pass a function that pulls the value out of each element.

```typescript
import { maxBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const richest = maxBy(accounts, account => account.balance);
console.log(richest); // { owner: 'bob', balance: 30n }
```

When several elements tie for the largest value, the first one wins. `getValue` also receives the index and the whole array.

```typescript
import { maxBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 30n };
const second = { id: 'b', score: 30n };
console.log(maxBy([first, second], item => item.score)); // { id: 'a', score: 30n }

// Compare by a value derived from both the element and its position
const rounds = [{ points: 5n }, { points: 5n }, { points: 5n }];
const best = maxBy(rounds, (round, index) => round.points * BigInt(index + 1));
console.log(best); // the third round, because its multiplier is the largest
```

An empty array has no element to return, so it throws.

```typescript
import { maxBy } from 'es-toolkit/bigint';

maxBy([], () => 0n); // RangeError: Cannot find the maximum of an empty array.
```

#### Parameters

- `items` (`readonly T[]`): The array of elements to search.
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): A function that returns the `BigInt` to compare by.

#### Returns

(`T`): Returns the element with the largest derived `BigInt`. Returns the first of several elements that tie.

#### Throws

Throws a `RangeError` if the array is empty.
