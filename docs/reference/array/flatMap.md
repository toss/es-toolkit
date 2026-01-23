# flatMap

Transforms each element of an array with a function's return value, then flattens to a specified depth and returns a new array.

```typescript
const result = flatMap(arr, iteratee, depth);
```

## Usage

### `flatMap(arr, iteratee, depth = 1)`

Use `flatMap` when you want to transform and flatten an array simultaneously. First, it applies a function to each element, then flattens the resulting array to the specified depth.

It works identically to calling [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) from JavaScript with [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) as `map(iteratee).flat(depth)`, but it's faster.

```typescript
import { flatMap } from 'es-toolkit/array';

// Duplicate each element twice in a number array.
const arr = [1, 2, 3];
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// Flatten with depth 2.
flatMap(arr, item => [[item, item]], 2);
// Returns: [1, 1, 2, 2, 3, 3]
```

You can flatten to various depths.

```typescript
import { flatMap } from 'es-toolkit/array';

const arr = [1, 2, 3];

// Flatten with default depth 1.
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// Flatten with depth 3.
flatMap(arr, item => [[[item, item]]], 3);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### Parameters

- `arr` (`T[]`): The array to transform.
- `iteratee` (`(item: T, index: number, array: readonly T[]) => U`): The function that transforms each array element. It receives the element, its index, and the array.
- `depth` (`D`, optional): The depth to flatten. Default is `1`.

#### Returns

(`Array<FlatArray<U[], D>>`): Returns a new array where each element is transformed and flattened to the specified depth.

## Examples

```typescript
// Using index parameter
const arr = [1, 2, 3];
flatMap(arr, (item, index) => [item + index]);
// Returns: [1, 3, 5]

// Using array parameter
flatMap(arr, (item, _index, array) => [item * array.length]);
// Returns: [3, 6, 9]
```
