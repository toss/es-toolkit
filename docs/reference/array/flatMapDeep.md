# flatMapDeep

Transforms each element of an array with a function's return value, then flattens all depths and returns a new array.

```typescript
const result = flatMapDeep(arr, iteratee);
```

## Usage

### `flatMapDeep(arr, iteratee)`

Use `flatMapDeep` when you want to transform an array while completely flattening all nested arrays. First, it applies a function to each element, then flattens the resulting array to all depths.

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// Duplicate each element twice and flatten completely.
const result1 = flatMapDeep([1, 2, 3], item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]
```

It flattens all depths no matter how deeply nested.

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// Flatten nested arrays completely.
const result = flatMapDeep([1, 2, 3], item => [[item, item]]);
// Returns: [1, 1, 2, 2, 3, 3]

// Flatten multiple levels of nesting.
const result2 = flatMapDeep([1, 2, 3], item => [[[item, item]]]);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### Parameters

- `arr` (`T[]`): The array to transform.
- `iteratee` (`(item: T, index: number, array: readonly T[]) => U`): The function that transforms each array element. It receives the element, its index, and the array.

#### Returns

(`Array<ExtractNestedArrayType<U>>`): Returns a new array where each element is transformed and all depths are flattened.

## Examples

```typescript
// Using index parameter
const arr = [1, 2, 3];
flatMapDeep(arr, (item, index) => [[item + index]]);
// Returns: [1, 3, 5]

// Using array parameter
flatMapDeep(arr, (item, _index, array) => [[item * array.length]]);
// Returns: [3, 6, 9]
```
