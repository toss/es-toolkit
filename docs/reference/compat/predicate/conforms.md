# conforms (Lodash Compatibility)

Creates a function that checks if an object satisfies all the conditions defined in the given predicate object.

```typescript
const checker = conforms(predicates);
```

## Reference

### `conforms(source)`

Use `conforms` when you need to check multiple properties against their respective conditions at once. This function generates a validation function that's useful for testing multiple objects later.

```typescript
import { conforms } from 'es-toolkit/compat';

// Define condition functions
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const isString = s => typeof s === 'string';

// Create a validator with multiple conditions
const validator = conforms({
  a: isPositive,
  b: isEven,
  c: isString,
});

// Validate objects
validator({ a: 2, b: 4, c: 'hello' }); // true (all conditions met)
validator({ a: -1, b: 4, c: 'hello' }); // false (a is not positive)
validator({ a: 2, b: 3, c: 'hello' }); // false (b is not even)
validator({ a: 2, b: 4, c: 123 }); // false (c is not a string)

// Use in array filtering
const users = [
  { age: 25, score: 80, name: 'Alice' },
  { age: 17, score: 95, name: 'Bob' },
  { age: 30, score: 75, name: 'Charlie' },
];

const adultHighScorer = conforms({
  age: n => n >= 18,
  score: n => n >= 80,
});

const filteredUsers = users.filter(adultHighScorer);
// [{ age: 25, score: 80, name: 'Alice' }]
```

#### Parameters

- `source` (`Record<PropertyKey, (value: any) => boolean>`): An object containing predicate functions for each property.

#### Returns

(`(object: Record<PropertyKey, any>) => boolean`): Returns a function that checks if a given object satisfies all the conditions.
