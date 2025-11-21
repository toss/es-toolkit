# cond (Lodash Compatibility)

::: warning Use if-else or switch statements instead

This `cond` function performs slowly due to complex iteratee processing, array transformations, and function validation.

Use faster and clearer if-else or switch statements instead.

:::

Creates a function that iterates through condition-function pairs, checking conditions in order and executing the first matching function.

```typescript
const conditionFunction = cond(pairs);
```

## Usage

### `cond(pairs)`

Use `cond` when you want to check multiple conditions in order and execute the function corresponding to the first true condition. This is useful for expressing complex conditional logic in a functional style.

```typescript
import { cond } from 'es-toolkit/compat';

// Basic usage
const getValue = cond([
  [x => x > 10, x => 'big'],
  [x => x > 5, x => 'medium'],
  [x => x > 0, x => 'small'],
  [() => true, () => 'zero or negative'],
]);

console.log(getValue(15)); // "big"
console.log(getValue(8)); // "medium"
console.log(getValue(3)); // "small"
console.log(getValue(-1)); // "zero or negative"
```

You can also use it for object pattern matching.

```typescript
import { cond } from 'es-toolkit/compat';

const processUser = cond([
  [user => user.role === 'admin', user => `Admin: ${user.name}`],
  [user => user.role === 'user', user => `User: ${user.name}`],
  [user => user.role === 'guest', user => `Guest: ${user.name}`],
  [() => true, () => 'Unknown role'],
]);

console.log(processUser({ name: 'John', role: 'admin' })); // "Admin: John"
console.log(processUser({ name: 'Jane', role: 'user' })); // "User: Jane"
```

Only the first true condition is executed. If all conditions are false, it returns `undefined`.

```typescript
import { cond } from 'es-toolkit/compat';

const checkValue = cond([
  [x => x > 10, x => 'greater than 10'],
  [x => x < 5, x => 'less than 5'],
]);

console.log(checkValue(15)); // "greater than 10"
console.log(checkValue(3)); // "less than 5"
console.log(checkValue(7)); // undefined (no matching condition)
```

#### Parameters

- `pairs` (`Array<[predicate, func]>`): An array of pairs consisting of condition functions and functions to execute.

#### Returns

(`(...args: any[]) => unknown`): Returns a new function that checks conditions and executes the first matching function.
