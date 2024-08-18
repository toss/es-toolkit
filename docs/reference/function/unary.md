# unary

Creates a function that accepts up to one argument, ignoring any additional arguments.

## Signature

```typescript
function unary<F extends (...args: any[]) => any>(func: F): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to cap arguments for.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new capped function.

## Examples

```typescript
import { unary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

unary(fn)(1, 2, 3); // [Arguments] { '0': 1 }
```
