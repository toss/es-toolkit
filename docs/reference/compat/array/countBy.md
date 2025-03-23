# countBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an object composed of keys generated from the results of running each element of `collection`
through `iteratee`. The corresponding value of each key is the number of times the key was returned.

## Signature

```typescript
function countBy<T, K extends PropertyKey = PropertyKey>(collection: ArrayLike<T> | null | undefined, iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined): Record<K, number>;
function countBy<T, K extends PropertyKey = PropertyKey>(collection: Record<PropertyKey, T> | null | undefined, iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined): Record<K, number>;
function countBy<T, K extends PropertyKey>(collection: ArrayLike<T> | Record<PropertyKey, T> | null | undefined, iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined): Record<K, number>;
```

## Examples

```typescript
countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
```