# partition (Lodash Compatibility)

::: warning Use [partition](../../array/partition.md) from `es-toolkit` instead

This `partition` function operates slowly due to handling `null` or `undefined` and various predicate types.

Use the faster and more modern [partition](../../array/partition.md) from `es-toolkit` instead.

:::

Splits the elements of a collection into two groups based on a condition.

```typescript
const [truthy, falsy] = partition(collection, predicate);
```

## Reference

### `partition(collection, predicate)`

Splits the elements of an array or object into two groups based on a given predicate function. The first group contains elements where the predicate is true, and the second group contains elements where the predicate is false.

```typescript
import { partition } from 'es-toolkit/compat';

// Split number array into even and odd
partition([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
// => [[2, 4, 6], [1, 3, 5]]

// Specify condition with property name
const users = [
  { name: 'john', active: true },
  { name: 'jane', active: false },
  { name: 'bob', active: true },
];

partition(users, 'active');
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// Filter with object condition
partition(users, { active: true });
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// Filter with array condition
partition(users, ['name', 'john']);
// => [
//   [{ name: 'john', active: true }],
//   [{ name: 'jane', active: false }, { name: 'bob', active: true }]
// ]
```

For objects, partitions the values.

```typescript
import { partition } from 'es-toolkit/compat';

const obj = {
  a: { score: 90 },
  b: { score: 40 },
  c: { score: 80 },
};

partition(obj, item => item.score >= 80);
// => [[{ score: 90 }, { score: 80 }], [{ score: 40 }]]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { partition } from 'es-toolkit/compat';

partition(null, x => x > 0); // [[], []]
partition(undefined, 'active'); // [[], []]
```

#### Parameters

- `collection` (`ArrayLike<T> | T | null | undefined`): The array or object to partition.
- `predicate` (`((value: T) => unknown) | Partial<T> | [PropertyKey, any] | PropertyKey`, optional): The condition to test each element. Can be a function, partial object, property-value array, or property name. Defaults to `identity`.

#### Returns

(`[T[], T[]]`): Returns an array containing an array of elements that satisfy the condition and an array of elements that don't.
