# negate (Lodash Compatibility)

::: warning Use the logical NOT operator

This `negate` function simply negates the result of a function. In most cases, it's simpler and faster to use the logical NOT operator (`!`) directly.

Instead, use the faster and more modern `!predicate(...args)` or `(...args) => !predicate(...args)`.

:::

Creates a new function that negates the result of the given function.

```typescript
const negatedFunc = negate(predicate);
```

## Reference

### `negate(predicate)`

Use `negate` when you want to create a new function that negates the result of a function. It's useful for checking opposite conditions in filtering or conditional statements.

```typescript
import { negate } from 'es-toolkit/compat';

// Basic usage
function isEven(n) {
  return n % 2 === 0;
}

const isOdd = negate(isEven);
console.log(isOdd(3)); // true
console.log(isOdd(4)); // false

// Using in array filtering
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]

// Modern alternative (recommended)
const modernOddNumbers = numbers.filter(n => !isEven(n));
// or
const isOddModern = n => !isEven(n);
const modernOddNumbers2 = numbers.filter(isOddModern);

// Complex example
function isEmpty(str) {
  return str.trim().length === 0;
}

const hasContent = negate(isEmpty);
const messages = ['', ' ', 'hello', '  ', 'world'];
const validMessages = messages.filter(hasContent);
console.log(validMessages); // ['hello', 'world']
```

It's primarily used in array filtering or conditional logic, but in most cases, using the logical NOT operator directly is more intuitive.

#### Parameters

- `predicate` (`Function`): The function whose result should be negated. It must return a boolean value.

#### Returns

(`Function`): Returns a new function that returns the negated result of the original function.
