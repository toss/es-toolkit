# zipObjectDeep (Lodash Compatibility)

Creates a deeply nested object using a path array and a value array.

```typescript
const result = zipObjectDeep(keys, values);
```

## Usage

### `zipObjectDeep(keys, values)`

Creates a deeply nested object using paths from the first array and values from the second array. Paths can be provided as dot notation strings or property name arrays. This is useful when generating complex nested data structures or converting flat key-value pairs into hierarchical objects.

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

// Specify paths as dot notation strings
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// Returns: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// Specify paths as arrays
const pathArrays = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values2 = [1, 2];
const result2 = zipObjectDeep(pathArrays, values2);
// Returns: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// Paths including array indices
const arrayPaths = ['a.b[0].c', 'a.b[1].d'];
const values3 = [1, 2];
const result3 = zipObjectDeep(arrayPaths, values3);
// Returns: { a: { b: [{ c: 1 }, { d: 2 }] } }
```

`null` or `undefined` key arrays are treated as empty objects.

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

zipObjectDeep(null, [1, 2]); // {}
zipObjectDeep(undefined, [1, 2]); // {}
```

#### Parameters

- `keys` (`ArrayLike<PropertyPath> | null | undefined`): An array of property paths. Can use dot notation strings or property name arrays.
- `values` (`ArrayLike<any>`, optional): An array of corresponding values. If not provided, treated as an empty array.

#### Returns

(`object`): Returns a deeply nested object constructed from the given paths and values.
