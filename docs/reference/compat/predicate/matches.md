# matches

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that performs a deep comparison between a given target and the source object.

This function produces the same results as the [isMatch](./isMatch.md) function, but provides for different ways to call it.

## Signature

```typescript
function matches(source: unknown): (target: unknown) => boolean;
```

## Parameters

- `source` (`unknown`): The source object to create the matcher from.

## Returns

- (`(target: unknown) => boolean`): Returns a function that takes a target object and returns `true` if the target matches the source, otherwise `false`.

## Examples

### Basic usage

```typescript
const matcher = matches({ a: 1, b: 2 });
matcher({ a: 1, b: 2, c: 3 }); // true
matcher({ a: 1, c: 3 }); // false
```

### Matching arrays

```typescript
const arrayMatcher = matches([1, 2, 3]);
arrayMatcher([1, 2, 3, 4]); // true
arrayMatcher([4, 5, 6]); // false
```

### Matching nested structures

```typescript
// Matching objects with nested structures
const nestedMatcher = matches({ a: { b: 2 } });
nestedMatcher({ a: { b: 2, c: 3 } }); // true
nestedMatcher({ a: { c: 3 } }); // false
```
