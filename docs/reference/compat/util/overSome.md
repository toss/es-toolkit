# overSome (Lodash Compatibility)

::: warning Use `Array.some` instead

This `overSome` function incurs additional overhead in the process of converting and checking predicate functions.

Use the faster and more modern `Array.some` method instead.

:::

Creates a function that checks if any of the predicate functions return truthy for the given value.

```typescript
const anyValidator = overSome(predicates);
```

## Reference

### `overSome(...predicates)`

Takes multiple predicate functions and creates a function that checks if the given value satisfies any of the conditions. This is useful for flexible condition checking or alternative validation.

```typescript
import { overSome } from 'es-toolkit/compat';

// Check if value is string or number
const isStringOrNumber = overSome([value => typeof value === 'string', value => typeof value === 'number']);

isStringOrNumber('hello'); // => true
isStringOrNumber(42); // => true
isStringOrNumber(true); // => false

// Check if any of multiple conditions are satisfied
const hasValidProperty = overSome([
  obj => obj.name && obj.name.length > 0,
  obj => obj.email && obj.email.includes('@'),
  obj => obj.phone && obj.phone.length >= 10,
]);

hasValidProperty({ name: 'John' }); // => true
hasValidProperty({ email: 'john@example.com' }); // => true
hasValidProperty({ phone: '1234567890' }); // => true
hasValidProperty({ age: 30 }); // => false
```

You can also check object properties.

```typescript
import { overSome } from 'es-toolkit/compat';

// Check if any condition matches
const matchesAnyCondition = overSome([
  'isActive', // Check if isActive property is truthy
  { role: 'admin' }, // Check if role is 'admin'
  ['status', 'vip'], // Check if status is 'vip'
]);

matchesAnyCondition({ isActive: true }); // => true
matchesAnyCondition({ role: 'admin' }); // => true
matchesAnyCondition({ status: 'vip' }); // => true
matchesAnyCondition({ role: 'user', status: 'normal' }); // => false
```

#### Parameters

- `...predicates` (`Array<Function | string | object | Array>`): The predicate functions to check. Can be functions, property names, objects, or property-value pairs.

#### Returns

(`(...args: any[]) => boolean`): Returns a function that returns `true` if any condition is satisfied, `false` if none are satisfied.
