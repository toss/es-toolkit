# isArguments (Lodash Compatibility)

Checks if a value is an arguments object.

```typescript
const result = isArguments(value);
```

## Usage

### `isArguments(value)`

Use `isArguments` when you need to check if a given value is a function's arguments object. This function also works as a type guard in TypeScript, narrowing the type of the value to `IArguments`.

```typescript
import { isArguments } from 'es-toolkit/compat';

// In regular functions
function normalFunction() {
  return isArguments(arguments); // true
}

// In strict mode
function strictFunction() {
  'use strict';
  return isArguments(arguments); // true
}

// Non-arguments values
isArguments([1, 2, 3]); // false
isArguments({ 0: 'a', 1: 'b', length: 2 }); // false
isArguments(null); // false
isArguments(undefined); // false

// Practical usage example
function example() {
  if (isArguments(arguments)) {
    console.log('This is an arguments object');
    console.log('Length:', arguments.length);
  }
}
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is an arguments object, otherwise `false`.
