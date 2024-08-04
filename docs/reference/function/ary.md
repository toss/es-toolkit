# ary

Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.

## Signature

```typescript
function ary<F extends (...args: any[]) => any>(
  func: F,
  n: number = func.length,
  guard?: any
): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to cap arguments for.
- `n` (`number`, optional): The arity cap, defaulting to the number of parameters of `func`. Negative numbers will be treated as `0`, and decimals will be rounded down.
- `guard` (`any`, optional): Enables use as an iteratee for methods like `map`.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new capped function.

## Examples

```typescript
import { ary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

ary(fn, 2)(1, 2, 3); // [Arguments] { '0': 1, '1': 2 }
ary(fn); // [Arguments] { '0': 1, '1': 2, '2': 3 }
ary(fn, -1); // [Arguments] {}
ary(fn, 1.5); // [Arguments] { '0': 1 }
ary(fn, 2, {}); // [Arguments] { '0': 1, '1': 2, '2': 3 }
```
