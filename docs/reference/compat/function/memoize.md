# memoize

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Memoizes the result of a function so that when called again with the same arguments, it returns the cached result.

## Signature

```typescript
function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T>;
```

### Parameters

- `func` (`T`): The function to have its output memoized
- `resolver` (`(...args: Parameters<T>) => any`): The function to resolve the cache key. Defaults to using the first argument as the key

### Returns

(`MemoizedFunction<T>`): Returns the memoized function. This function has the same signature as the original function and allows access to the cache through the `cache` property.

## Examples

```typescript
import { memoize } from 'es-toolkit/compat';
import { values } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
const other = { c: 3, d: 4 };

const memoizedValues = memoize(values);
memoizedValues(object);
// => [1, 2]

memoizedValues(other);
// => [3, 4]

object.a = 2;
memoizedValues(object);
// => [1, 2] (cached result)

// Modify the cache
memoizedValues.cache.set(object, ['a', 'b']);
memoizedValues(object);
// => ['a', 'b']
```
