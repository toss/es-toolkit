# rearg

Creates a function that invokes `func` with arguments arranged according to the specified `indexes` where the argument value at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.

## Signature

```typescript
function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indexes: Array<number | number[]>
): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to rearrange arguments for.
- `indexes` (`Array<number | number[]>`): The arranged argument indexes.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new function.

## Examples

```typescript
import { rearg } from 'es-toolkit/function';

const rearged = rearg(
  function (a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);

rearged('b', 'c', 'a');
// => ['a', 'b', 'c']
```
