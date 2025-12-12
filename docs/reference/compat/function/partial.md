# partial (Lodash Compatibility)

::: warning Use `es-toolkit`'s `partial`

This `partial` function is inefficient due to many overloads and union type handling. In most cases, it can be replaced with a simpler arrow function.

Instead, use the faster and more modern [`partial`](../../function/partial.md) from `es-toolkit`.

:::

Creates a partially applied function by pre-filling some arguments.

```typescript
const partialFunc = partial(func, ...args);
```

## Usage

### `partial(func, ...args)`

Use `partial` when you want to create a partially applied function by pre-filling some arguments. It's mainly useful for fixing the first arguments when argument order matters.

```typescript
import { partial } from 'es-toolkit/compat';

// Basic usage
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// Pre-set the first argument
const sayHello = partial(greet, 'Hello');
sayHello('Alice', '!'); // 'Hello Alice!'

// Pre-set multiple arguments
const greetAlice = partial(greet, 'Hello', 'Alice');
greetAlice('!'); // 'Hello Alice!'

// Use placeholder to control argument order
const greetWithExclamation = partial(greet, partial.placeholder, 'Alice', '!');
greetWithExclamation('Hi'); // 'Hi Alice!'
```

In most cases, it can be replaced with arrow functions:

```typescript
// Use arrow functions instead of partial (recommended)
const sayHello = (name, punctuation) => greet('Hello', name, punctuation);
const greetAlice = punctuation => greet('Hello', 'Alice', punctuation);
```

#### Parameters

- `func` (`Function`): The function to partially apply.
- `...args` (`any[]`): The arguments to pre-fill. Use `partial.placeholder` to control argument order.

#### Returns

(`Function`): Returns a new function with pre-filled arguments.
