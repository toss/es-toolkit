# zipObject

Creates a single object from a keys array and a values array.

```typescript
const object = zipObject(keys, values);
```

## Reference

### `zipObject(keys, values)`

Use `zipObject` when you want to combine two arrays into a single object. It returns a new object where elements from the first array become keys and elements from the second array become values.

```typescript
import { zipObject } from 'es-toolkit/array';

// Create an object from keys and values.
zipObject(['a', 'b', 'c'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3 }

// If there are more keys, undefined becomes the value.
zipObject(['a', 'b', 'c', 'd'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3, d: undefined }
```

If the values array is longer, excess values are ignored.

```typescript
import { zipObject } from 'es-toolkit/array';

zipObject(['a', 'b'], [1, 2, 3, 4]);
// Returns: { a: 1, b: 2 }
```

#### Parameters

- `keys` (`readonly P[]`): The array that will become the object's keys.
- `values` (`readonly V[]`): The array of values corresponding to each key.

#### Returns

(`Record<P, V>`): Returns a new object with keys and values combined.
