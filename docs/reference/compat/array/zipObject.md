# zipObject (Lodash Compatibility)

::: warning Use [zipObject](../../array/zipObject.md) from `es-toolkit`

This `zipObject` function operates slowly due to additional processing for Lodash compatibility.

Instead, use the faster and more modern [zipObject](../../array/zipObject.md) from `es-toolkit`.

:::

Creates an object using two arrays. The first array is used as property names, and the second array is used as the corresponding values.

```typescript
const result = zipObject(keys, values);
```

## Usage

### `zipObject(keys, values)`

Use `zipObject` when you want to create a single object from a key array and a value array. It uses elements from the first array as property names and elements from the second array as their corresponding values. This is especially useful when processing API responses or transforming data.

```typescript
import { zipObject } from 'es-toolkit/compat';

// Basic usage
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// Returns: { a: 1, b: 2, c: 3 }

// Arrays with different lengths
const keys2 = ['x', 'y', 'z'];
const values2 = [10, 20];
const result2 = zipObject(keys2, values2);
// Returns: { x: 10, y: 20, z: undefined }

// Empty arrays provided
const result3 = zipObject([], []);
// Returns: {}
```

#### Parameters

- `keys` (`PropertyKey[]`): The array to use as property names.
- `values` (`T[]`): The array to use as property values.

#### Returns

(`Record<PropertyKey, T>`): The created object.
