# iteratee (Lodash Compatibility)

::: warning Use direct functions or property access instead

This `iteratee` function performs slowly due to complex type conversions and handling of various cases.

Instead, use faster and more modern direct functions or property access.

:::

Creates a function that returns a value from an element.

```typescript
const getter = iteratee(source);
```

## Reference

### `iteratee(value?)`

Use `iteratee` when you want to create a function that extracts values from collection elements or checks conditions. It performs different actions based on the type of argument provided.

```typescript
import { iteratee } from 'es-toolkit/compat';

// Function: Returns the given function as-is
const func = iteratee(object => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func);
// Returns: [1, 2, 3]

// Property name: Function that returns the value of that property
const getA = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(getA);
// Returns: [1, 2, 3]

// Object: Function that checks if it matches the given object
const matchesObj = iteratee({ a: 1 });
[
  { a: 1, b: 2 },
  { a: 2, b: 3 },
  { a: 1, c: 4 },
].find(matchesObj);
// Returns: { a: 1, b: 2 }

// Property-value pair: Function that checks if the property matches a specific value
const matchesProperty = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(matchesProperty);
// Returns: { a: 1 }

// null or no argument: Function that returns the element as-is
const identity = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(identity);
// Returns: [{ a: 1 }, { a: 2 }, { a: 3 }]
```

Actions based on argument type:

- **Function**: Returns the given function as-is.
- **Property name**: Returns the value of the given property from the element.
- **Property-value pair**: Returns a boolean indicating whether the element's property matches the given value.
- **Partial object**: Returns a boolean indicating whether the element matches the partial object's properties and values.
- **null or no argument**: Returns a function that returns the element as-is.

#### Parameters

- `value` (`symbol | number | string | object | null | ((...args: any[]) => unknown)`, optional): The value to convert to an iteratee. Default is `null`.

#### Returns

(`(...args: any[]) => any`): Returns the new iteratee function.
