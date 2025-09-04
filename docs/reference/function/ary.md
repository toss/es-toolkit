# ary

Creates a new function that limits the given function to accept at most `n` arguments. Any additional arguments are ignored.

```typescript
const limitedFunc = ary(func, n);
```

## Reference

### `ary(func, n)`

Use the `ary` function when you want to limit the number of arguments a function can accept.

```typescript
import { ary } from 'es-toolkit';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// Limit to no arguments
ary(fn, 0)(1, 2, 3); // []

// Limit to 1 argument
ary(fn, 1)(1, 2, 3); // [1]

// Limit to 2 arguments
ary(fn, 2)(1, 2, 3); // [1, 2]
```

`ary` is particularly useful in functional programming. It can prevent callback functions from receiving unexpected arguments.

```typescript
// parseInt takes (string, radix) as arguments,
// but map passes (value, index, array).

['1', '2', '3'].map(parseInt);  
// Result: [1, NaN, NaN] 
// Because parseInt('2', 1) and parseInt('3', 2) are called.

// Use ary to limit to only the first argument
['1', '2', '3'].map(ary(parseInt, 1));  
// Result: [1, 2, 3] ✅
```

### Parameters

- `func` (`F`): The function to limit the number of arguments.
- `n` (`number`): The maximum number of arguments.

### Returns

(`(...args: any[]) => ReturnType<F>`): A new function that accepts at most `n` arguments.