# overEvery (Lodash Compatibility)

::: warning Use `Array.every` instead

This `overEvery` function incurs additional overhead in the process of converting and checking predicate functions.

Use the faster and more modern `Array.every` method instead.

:::

Creates a function that checks if all predicate functions return truthy for the given value.

```typescript
const allValidator = overEvery(predicates);
```

## Usage

### `overEvery(...predicates)`

Takes multiple predicate functions and creates a function that checks if the given value satisfies all conditions. This is useful for compound condition checking or data validation.

```typescript
import { overEvery } from 'es-toolkit/compat';

// Check string conditions
const isValidString = overEvery([
  value => typeof value === 'string',
  value => value.length > 3,
  value => value.includes('o'),
]);

isValidString('hello'); // => true
isValidString('hi'); // => false (length is 3 or less)
isValidString('test'); // => false (no 'o')

// Check number range
const isInRange = overEvery([
  num => num >= 0,
  num => num <= 100,
  num => num % 1 === 0, // Check if integer
]);

isInRange(50); // => true
isInRange(-5); // => false (less than 0)
isInRange(150); // => false (greater than 100)
isInRange(50.5); // => false (not an integer)
```

You can also check object properties.

```typescript
import { overEvery } from 'es-toolkit/compat';

// Check object properties
const isValidUser = overEvery([
  'name', // Check if name property is truthy
  { age: 30 }, // Check if age is 30
  ['active', true], // Check if active is true
]);

isValidUser({ name: 'John', age: 30, active: true }); // => true
isValidUser({ name: '', age: 30, active: true }); // => false (name is empty string)
isValidUser({ name: 'John', age: 25, active: true }); // => false (age is different)
```

#### Parameters

- `...predicates` (`Array<Function | string | object | Array>`): The predicate functions to check. Can be functions, property names, objects, or property-value pairs.

#### Returns

(`(...args: any[]) => boolean`): Returns a function that returns `true` if all conditions are satisfied, `false` if any condition is not satisfied.
