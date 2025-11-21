# flatMapDepth (Lodash Compatibility)

::: warning Use [flatMap](../../array/flatMap.md) from `es-toolkit`

This `flatMapDepth` function is implemented in a complex way to support various forms of iteratees and handle `null` or `undefined` for Lodash compatibility. The `flatMap` function in the main library only supports simple function iteratees, so it operates faster.

Use the faster and more modern [flatMap](../../array/flatMap.md) from `es-toolkit` instead.

:::

Transforms each element of an array with an iteratee function and flattens to the specified depth.

```typescript
const result = flatMapDepth(collection, iteratee, depth);
```

## Usage

### `flatMapDepth(collection, iteratee, depth)`

Transforms each element of an array or object with the given function, then flattens the result to the specified depth and returns a new array. Useful when you want to flatten nested array structures only to a desired depth.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// Transform an array and flatten to depth 2
flatMapDepth([1, 2], n => [[n, n]], 2);
// => [1, 1, 2, 2]

// When limited to depth 1, it's not fully flattened
flatMapDepth([1, 2], n => [[n, n]], 1);
// => [[1, 1], [2, 2]]

// Extract values from an object and flatten
const users = [
  { user: 'barney', hobbies: [['hiking'], ['coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDepth(users, 'hobbies', 2);
// => ['hiking', 'coding', 'reading']
```

This function supports various forms of iteratees.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// Transform with a function
flatMapDepth([1, 2, 3], n => [[n, n]], 2);

// Extract values by property name
const objects = [{ items: [['a'], ['b']] }, { items: [['c']] }];
flatMapDepth(objects, 'items', 2);
// => ['a', 'b', 'c']

// Partial matching with an object
const users = [{ active: [[true], [false]] }, { active: [[false]] }];
flatMapDepth(users, { active: [[false]] }, 2);
// => [true, true]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

flatMapDepth(null, n => [n], 1); // => []
flatMapDepth(undefined, n => [n], 1); // => []
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, any> | Record<number, any> | object | null | undefined`): The array or object to iterate over.
- `iteratee` (`((value: T, index: number, collection: any) => any) | string | object`, optional): The transformation function or property name to execute for each element. Default is `identity`.
- `depth` (`number`, optional): The maximum depth to flatten. Default is `1`.

#### Returns

(`T[]`): Returns a new array flattened to the specified depth after transformation with the iteratee.
