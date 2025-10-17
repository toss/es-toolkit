# partialRight (Lodash Compatibility)

::: warning Use `es-toolkit`'s `partialRight`

This `partialRight` function is inefficient due to many overloads and union type handling. In most cases, it can be replaced with a simpler arrow function.

Instead, use the faster and more modern [`partialRight`](../../function/partialRight.md) from `es-toolkit`.

:::

Creates a partially applied function by pre-filling arguments from the right.

```typescript
const partialFunc = partialRight(func, ...args);
```

## Reference

### `partialRight(func, ...args)`

Use `partialRight` when you want to create a partially applied function by pre-filling arguments from the right. It's mainly useful for fixing the last arguments when argument order matters.

```typescript
import { partialRight } from 'es-toolkit/compat';

// Basic usage
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// Pre-set the last argument
const greetWithExclamation = partialRight(greet, '!');
greetWithExclamation('Hello', 'Alice'); // 'Hello Alice!'

// Pre-set multiple arguments
const sayHiToAlice = partialRight(greet, 'Alice', '!');
sayHiToAlice('Hi'); // 'Hi Alice!'

// Use placeholder to control argument order
const greetAliceWithCustom = partialRight(greet, 'Alice', partialRight.placeholder);
greetAliceWithCustom('Hello', '?'); // 'Hello Alice?'
```

In most cases, it can be replaced with arrow functions:

```typescript
// Use arrow functions instead of partialRight (recommended)
const greetWithExclamation = (greeting, name) => greet(greeting, name, '!');
const sayHiToAlice = greeting => greet(greeting, 'Alice', '!');
```

#### Parameters

- `func` (`Function`): The function to partially apply.
- `...args` (`any[]`): The arguments to pre-fill. Use `partialRight.placeholder` to control argument order.

#### Returns

(`Function`): Returns a new function with arguments pre-filled from the right.
