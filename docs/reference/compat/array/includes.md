# includes

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if a specified value exists within a given source, which can be an array, an object, or a string.

The comparison uses SameValueZero to check for inclusion.

## Signature

```typescript
function includes<T>(arr: T[], item: T, fromIndex?: number): boolean;
function includes<T extends Record<string, any>>(obj: T, value: T[keyof T], fromIndex?: number): boolean;
function includes(str: string, substr: string, fromIndex?: number): boolean;
```

### Parameters

- `source` (`T[] | Record<string, any> | string`): The source to search in. It can be an array, an object, or a string.
- `target` (`T`): The value to search for in the source.
- `fromIndex` (`number`): The index to start searching from. If negative, it is treated as an offset from the end of the source.

### Returns

(`boolean`): `true` if the value is found in the source, `false` otherwise.

## Examples

```typescript
includes([1, 2, 3], 2); // true
includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
includes('hello world', 'world'); // true
includes('hello world', 'test'); // false
```
