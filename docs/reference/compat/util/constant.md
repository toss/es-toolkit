# constant (Lodash Compatibility)

::: warning Use arrow functions instead

This `constant` function creates an unnecessary function wrapper for simple tasks, which creates unnecessary overhead.

Instead, use a simpler and more intuitive arrow function.

:::

Creates a function that always returns the given value.

```typescript
const constantFunction = constant(value);
```

## Reference

### `constant(value)`

Use `constant` when you need a function that always returns a specific value. It's useful in functional programming when providing default values or as callback functions.

```typescript
import { constant } from 'es-toolkit/compat';

// Basic usage
const always42 = constant(42);
console.log(always42()); // 42

const alwaysHello = constant('hello');
console.log(alwaysHello()); // "hello"
```

It's convenient when used with array map or other higher-order functions.

```typescript
import { constant } from 'es-toolkit/compat';

// Fill all elements with 0
const numbers = [1, 2, 3, 4, 5];
const zeros = numbers.map(constant(0));
console.log(zeros); // [0, 0, 0, 0, 0]

// Replace all elements with the same object
const users = ['alice', 'bob', 'charlie'];
const defaultUser = users.map(constant({ role: 'user', active: true }));
console.log(defaultUser);
// [{ role: 'user', active: true }, { role: 'user', active: true }, { role: 'user', active: true }]
```

Can also be used for providing conditional default values.

```typescript
import { constant } from 'es-toolkit/compat';

function processData(data, fallback = constant('default value')) {
  return data || fallback();
}

console.log(processData(null)); // "default value"
console.log(processData('actual data')); // "actual data"
```

Maintains object references.

```typescript
import { constant } from 'es-toolkit/compat';

const obj = { a: 1 };
const getObj = constant(obj);

console.log(getObj() === obj); // true (same object reference)
```

#### Parameters

- `value` (`T`, optional): The value the function should return. If not provided, returns `undefined`.

#### Returns

(`() => T | undefined`): Returns a new function that always returns the given value.
