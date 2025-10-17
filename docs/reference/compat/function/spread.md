# spread (Lodash Compatibility)

::: warning Use modern spread operator instead

This `spread` function handles complex logic to spread array arguments at a specific index into individual arguments, which can be slow.

Use the faster, more modern spread operator (`...`) directly instead.

:::

Creates a new function that spreads array arguments into individual arguments when calling the function.

```typescript
const spreadFunc = spread(func, argsIndex);
```

## Reference

### `spread(func, argsIndex)`

Use `spread` when you want to call a function by spreading an array argument into individual arguments. You can specify the position of the array, allowing it to work with other arguments.

```typescript
import { spread } from 'es-toolkit/compat';

// Basic usage - first argument is an array
function add(a, b) {
  return a + b;
}

const spreadAdd = spread(add);
spreadAdd([1, 2]); // 3

// When the second argument is an array
function greet(greeting, names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

const spreadGreet = spread(greet, 1);
spreadGreet('Hello', ['Alice', 'Bob']); // 'Hello, Alice and Bob!'

// Modern spread operator example (recommended)
function modernAdd(a, b) {
  return a + b;
}

const numbers = [1, 2];
modernAdd(...numbers); // 3 - simpler and faster
```

It's especially useful when passing arrays as function arguments, but in modern JavaScript, using the spread operator is more common.

#### Parameters

- `func` (`Function`): The function to transform.
- `argsIndex` (`number`, optional): The position of the array argument. Default is `0`.

#### Returns

(`Function`): Returns a new function that spreads the array argument when called.
