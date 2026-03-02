# flattenDeep

Returns a new array with all depths of a nested array flattened.

```typescript
const result = flattenDeep(arr);
```

## Usage

### `flattenDeep(arr)`

Use `flattenDeep` when you want to completely flatten a nested array, no matter how deeply nested it is. It unwinds all nested arrays within the array, creating a single flat structure.

It works identically to calling [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) as `flat(Infinity)` in the JavaScript language, but it's faster.

```typescript
import { flattenDeep } from 'es-toolkit/array';

// Flatten all nested levels
const array = [1, [2, [3]], [4, [5, 6]]];
const result = flattenDeep(array);
// Returns: [1, 2, 3, 4, 5, 6]
```

It completely flattens even highly complex nested structures.

```typescript
import { flattenDeep } from 'es-toolkit/array';

const complexArray = [1, [2, [3, [4, [5]]]], 6];
const result = flattenDeep(complexArray);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### Parameters

- `arr` (`T[]`): The nested array to flatten.

#### Returns

(`Array<ExtractNestedArrayType<T>>`): Returns a new array with all depths flattened.
