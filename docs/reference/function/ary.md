# ary

Creates a new function that limits the number of arguments a function can accept.

```typescript
const limitedFunc = ary(func, n);
```

## Reference

### `ary(func, n)`

Use `ary` when you want to limit the number of arguments a function can accept. Additional arguments passed are ignored. This is especially useful in functional programming to prevent callback functions from receiving unexpected arguments.

```typescript
import { ary } from 'es-toolkit/function';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// Limit to accept no arguments
ary(fn, 0)(1, 2, 3);
// Returns: []

// Limit to accept only 1 argument
ary(fn, 1)(1, 2, 3);
// Returns: [1]

// Limit to accept only 2 arguments
ary(fn, 2)(1, 2, 3);
// Returns: [1, 2]
```

This is especially useful when used with array methods like `map`.

```typescript
// parseInt accepts two arguments, but map passes three
['1', '2', '3'].map(parseInt);
// Returns: [1, NaN, NaN]

['1', '2', '3'].map(parseInt);
// Result: [1, NaN, NaN]
// Because parseInt('2', 1), parseInt('3', 2) are executed.

// Use ary to limit to only the first argument
['1', '2', '3'].map(ary(parseInt, 1));
// Result: [1, 2, 3] ✅
```

#### Parameters

- `func` (`F`): The function to limit the number of arguments.
- `n` (`number`): The maximum number of arguments to accept.

#### Returns

(`(...args: any[]) => ReturnType<F>`): A new function that accepts at most `n` arguments.
