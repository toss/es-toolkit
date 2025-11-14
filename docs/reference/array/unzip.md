# unzip

Unpacks grouped arrays and creates new arrays by gathering elements at the same position.

```typescript
const unzippedArrays = unzip(zipped);
```

## Usage

### `unzip(zipped)`

Use `unzip` when you want to create new arrays by collecting elements at the same index from a 2D array where multiple arrays are grouped together. It's the opposite operation of zip.

```typescript
import { unzip } from 'es-toolkit/array';

// Unpack arrays grouped with strings, booleans, and numbers.
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
  ['c', true, 3],
];
const result = unzip(zipped);
console.log(result);
// [['a', 'b', 'c'], [true, false, true], [1, 2, 3]]

// Unpack arrays grouped with user information.
const users = [
  ['john', 30, 'engineer'],
  ['jane', 25, 'designer'],
  ['bob', 35, 'manager'],
];
const [names, ages, roles] = unzip(users);
console.log(names); // ['john', 'jane', 'bob']
console.log(ages); // [30, 25, 35]
console.log(roles); // ['engineer', 'designer', 'manager']
```

It can also handle arrays of different lengths. For shorter arrays, empty positions are filled with `undefined`.

```typescript
import { unzip } from 'es-toolkit/array';

const mixed = [[1, 'a'], [2, 'b', true], [3]];
const result = unzip(mixed);
console.log(result);
// [[1, 2, 3], ['a', 'b', undefined], [undefined, true, undefined]]
```

Passing an empty array returns an empty array.

```typescript
import { unzip } from 'es-toolkit/array';

const empty = unzip([]);
console.log(empty); // []
```

#### Parameters

- `zipped` (`ReadonlyArray<[...T]>`): A 2D array where multiple arrays are grouped together to be unpacked.

#### Returns

(`Unzip<T>`): New arrays where elements at the same position are grouped together. If the original arrays have different lengths, empty positions in shorter arrays are filled with `undefined`.
