# ary

Creates a function that invokes func, with up to `n` arguments, ignoring any additional arguments.

## Signature

```typescript
function ary<F extends (...args: any[]) => any>(func: F, n: number): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to cap arguments for.
- `n` (`number`): The arity cap.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new capped function.

## Examples

```typescript
import { ary } from 'es-toolkit/function';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

ary(fn, 0)(1, 2, 3); // []
ary(fn, 1)(1, 2, 3); // [1]
ary(fn, 2)(1, 2, 3); // [1, 2]
ary(fn, 3)(1, 2, 3); // [1, 2, 3]
```
