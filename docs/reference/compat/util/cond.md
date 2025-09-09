# cond

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that checks conditions one by one and runs the matching function.

Each pair consists of a condition (predicate) and a function to run.
The function goes through each condition in order until it finds one that's `true`.
When it finds a `true` condition, it runs the corresponding function and returns its result.
If none of the conditions are true, it returns `undefined`.

## Signature

```typescript
function cond<R>(pairs: Array<[truthy: () => boolean, falsey: () => R]>): () => R;
function cond<T, R>(pairs: Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>): (val: T) => R;
```

### Parameters

- `pairs` (`Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>`): Array of pairs. Each pair consists of a predicate function and a function to run.

### Returns

(`(val: T) => R`): A new composite function that checks conditions and runs the matching function.

## Examples

```typescript
const func = cond([
  [matches({ a: 1 }), constant('matches A')],
  [conforms({ b: isNumber }), constant('matches B')],
  [stubTrue, constant('no match')],
]);

func({ a: 1, b: 2 });
// => 'matches A'

func({ a: 0, b: 1 });
// => 'matches B'

func({ a: '1', b: '2' });
// => 'no match'
```
