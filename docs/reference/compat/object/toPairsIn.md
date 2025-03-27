# toPairsIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of key-value pairs from an object, set, or map, including inherited properties.

- When an object is provided, it returns an array of elements paired with the object's properties and values (`[key, value]`).
- When a `Set` is provided, it returns an array of elements paired in the format `[value, value]`.
- When a `Map` is provided, it returns an array of elements paired with keys and values (`[key, value]`).

## Signature

```typescript
function toPairsIn<T>(object: Record<string | number, T>): Array<[string, T]>;
function toPairsIn<T>(set: Set<T>): Array<[T, T]>;
function toPairsIn<K, V>(map: Map<K, V>): Array<[K, V]>;
```

### Parameters

- `object` (`Record<any, any> | Set<any> | Map<any, any>`): The object, set, or map to query.

### Returns

(`Array<[key: PropertyKey, value: any]>`): Returns the array of key-value pairs.

## Examples

```typescript
const object = { a: 1, b: 2 };
toPairsIn(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairsIn(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairsIn(map); // [['a', 1], ['b', 2]]
```