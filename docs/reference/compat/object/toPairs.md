# toPairs

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of key-value pairs from an object, set, or map.

- When an object is provided, it returns an array of elements paired with the object's properties and values (`[key, value]`).
- When a `Set` is provided, it returns an array of elements paired in the format `[value, value]`.
- When a `Map` is provided, it returns an array of elements paired with keys and values (`[key, value]`).

## Signature

```typescript
function toPairs<T>(object?: Record<string, T> | Record<number, T>): Array<[string, T]>;
function toPairs(object?: object): Array<[string, any]>;
```

### Parameters

- `object` (`Record<string, T> | Record<number, T> | object`, optional): The object, `Set`, or `Map` to query.

### Returns

(`Array<[string, T]> | Array<[string, any]>`): Array of property-value pairs.

## Examples

```typescript
const object = { a: 1, b: 2 };
toPairs(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairs(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairs(map); // [['a', 1], ['b', 2]]
```
