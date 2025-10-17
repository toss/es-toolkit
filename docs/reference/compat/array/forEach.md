# forEach (Lodash compatible)

::: warning Use `Array.prototype.forEach()` instead

This `forEach` function operates slowly due to complex object processing, early termination logic, and more.

Use the faster and more modern `Array.prototype.forEach()` instead.

:::

Executes a function for each element of an array or object.

```typescript
forEach(collection, callback);
```

## Reference

### `forEach(collection, callback)`

Use `forEach` when you want to iterate over all elements of an array or object and execute a callback function for each element. The iteration stops if the callback returns `false`.

```typescript
import { forEach } from 'es-toolkit/compat';

// Iterate over array
const numbers = [1, 2, 3, 4, 5];
const results: number[] = [];

forEach(numbers, value => {
  results.push(value * 2);
});
// results is [2, 4, 6, 8, 10]

// Early termination
const numbers2 = [1, 2, 3, 4, 5];
const results2: number[] = [];

forEach(numbers2, value => {
  if (value > 3) {
    return false; // Stop iteration
  }
  results2.push(value);
});
// results2 is [1, 2, 3]
```

Works the same way with objects.

```typescript
import { forEach } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
const keys: string[] = [];
const values: number[] = [];

forEach(obj, (value, key) => {
  keys.push(key);
  values.push(value);
});
// keys is ['a', 'b', 'c']
// values is [1, 2, 3]
```

`null` or `undefined` are treated as empty collections.

```typescript
import { forEach } from 'es-toolkit/compat';

forEach(null, value => {
  console.log(value); // Not executed
});

forEach(undefined, value => {
  console.log(value); // Not executed
});
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): The array or object to iterate over.
- `callback` (`(value: T, index: number | string, collection: any) => void | false`): The function to execute for each element. Returns `false` to stop iteration.

#### Returns

(`T`): Returns the original collection that was iterated over.
