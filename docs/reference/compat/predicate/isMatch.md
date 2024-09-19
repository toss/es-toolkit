# isMatch

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if the target matches the source by comparing their structures and values.
This function supports deep comparison for objects, arrays, maps, and sets.

## Signature

```typescript
function isMatch(target: unknown, source: unknown): boolean;
```

### Parameters

- `target` (`unknown`): The target value to match against.
- `source` (`unknown`): The source value to match with.

### Returns

(`boolean`): Returns `true` if the target matches the source, otherwise `false`.

## Examples

### Basic usage

```typescript
isMatch({ a: 1, b: 2 }, { a: 1 }); // true
```

### Matching arrays

```typescript
isMatch([1, 2, 3], [1, 2, 3]); // true
isMatch([1, 2, 2, 3], [2, 2]); // true
isMatch([1, 2, 3], [2, 2]); // false
```

### Matching maps

```typescript
const targetMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const sourceMap = new Map([['key1', 'value1']]);
isMatch(targetMap, sourceMap); // true
```

### Matching sets

```javascript
const targetSet = new Set([1, 2, 3]);
const sourceSet = new Set([1, 2]);
isMatch(targetSet, sourceSet); // true
```
