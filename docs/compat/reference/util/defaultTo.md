# defaultTo (Lodash Compatibility)

Returns the default value for values that are `null`, `undefined`, or `NaN`.

```typescript
const result = defaultTo(value, defaultValue);
```

## Usage

### `defaultTo(value, defaultValue)`

Use `defaultTo` when you want to provide a default value when a value is `null`, `undefined`, or `NaN`. It's useful for handling invalid values from API responses or user input.

```typescript
import { defaultTo } from 'es-toolkit/compat';

// Basic usage
console.log(defaultTo(null, 'default')); // 'default'
console.log(defaultTo(undefined, 'default')); // 'default'
console.log(defaultTo(NaN, 0)); // 0
console.log(defaultTo('actual', 'default')); // 'actual'
console.log(defaultTo(123, 0)); // 123
```

Can be used for processing API responses.

```typescript
import { defaultTo } from 'es-toolkit/compat';

function processUserData(response) {
  return {
    name: defaultTo(response.name, 'No name'),
    age: defaultTo(response.age, 0),
    score: defaultTo(response.score, 0), // Includes NaN handling
  };
}

// When API returns incomplete data
const userData = processUserData({
  name: null,
  age: undefined,
  score: NaN,
});

console.log(userData);
// { name: 'No name', age: 0, score: 0 }
```

Can also be used with arrays or objects.

```typescript
import { defaultTo } from 'es-toolkit/compat';

const users = defaultTo(response.users, []);
const metadata = defaultTo(response.metadata, {});

// Only handles null/undefined/NaN, not empty arrays or objects
console.log(defaultTo([], ['default'])); // [] (empty array but valid value)
console.log(defaultTo({}, { default: true })); // {} (empty object but valid value)
```

#### Parameters

- `value` (`T | null | undefined`): The value to check.
- `defaultValue` (`D`): The default value to return when the value is `null`, `undefined`, or `NaN`.

#### Returns

(`T | D`): Returns the original value if valid, otherwise returns the default value.
