# conformsTo (Lodash Compatibility)

Checks if an object satisfies all given condition functions.

```typescript
const result = conformsTo(target, source);
```

## Reference

### `conformsTo(target, source)`

Use `conformsTo` when you need to check if an object's properties satisfy all specified conditions. It applies each condition function to the corresponding property to check the results.

```typescript
import { conformsTo } from 'es-toolkit/compat';

// Basic usage
const object = { a: 1, b: 2 };
const conditions = {
  a: n => n > 0,
  b: n => n > 1,
};

conformsTo(object, conditions); // true (all conditions satisfied)

// Various conditions
const user = { name: 'Alice', age: 25, active: true };
const userValidation = {
  name: s => typeof s === 'string' && s.length > 0,
  age: n => typeof n === 'number' && n >= 18,
  active: b => typeof b === 'boolean',
};

conformsTo(user, userValidation); // true

// When conditions are not satisfied
const invalidUser = { name: '', age: 15, active: 'yes' };
conformsTo(invalidUser, userValidation); // false

// Partial condition checking
const partialConditions = {
  age: n => n >= 21,
};
conformsTo(user, partialConditions); // true (only checks age)

// When property is missing
const incompleteObject = { a: 1 }; // no b property
const strictConditions = {
  a: n => n > 0,
  b: n => n > 0,
};
conformsTo(incompleteObject, strictConditions); // false (b property is missing)
```

#### Parameters

- `target` (`Record<PropertyKey, any>`): The object to inspect.
- `source` (`Record<PropertyKey, (value: any) => boolean>`): An object with condition functions for each property.

#### Returns

(`boolean`): Returns `true` if the object satisfies all conditions, otherwise `false`.
