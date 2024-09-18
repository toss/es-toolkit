# toPath

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts a deep key string into an array of path segments.

This function takes a string representing a deep key (e.g., `'a.b.c'` or `'a[b][c]'`) and breaks it down into an array of strings, each representing a segment of the path.

## Signature

```typescript
function toPath(deepKey: string): string[];
```

### Parameters

- `deepKey` (`string`): The deep key string to convert.

### Returns

(`string[]`): An array of strings, each representing a segment of the path.

## Examples

```typescript
toPath('a.b.c'); // Returns ['a', 'b', 'c']
toPath('a[b][c]'); // Returns ['a', 'b', 'c']
toPath('.a.b.c'); // Returns ['', 'a', 'b', 'c']
toPath('a["b.c"].d'); // Returns ['a', 'b.c', 'd']
toPath(''); // Returns []
toPath('.a[b].c.d[e]["f.g"].h'); // Returns ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```
