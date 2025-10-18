# isEqual

Performs a deep comparison to check if two values are equal.

```typescript
const result = isEqual(a, b);
```

## Reference

### `isEqual(a, b)`

Use `isEqual` when you want to check if two values are deeply equal, including objects, arrays, Date, RegExp, etc. Returns `true` if the contents are the same even if the references are different. Useful for unit testing and data comparison.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// Primitive type comparison
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// Special value handling
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

Supports deep comparison of objects and arrays.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// Deep object comparison
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
isEqual(obj1, obj2); // true

// Array comparison
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
isEqual(arr1, arr2); // true
```

Can also compare objects like Date, RegExp, Map, Set.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// Date comparison
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

// RegExp comparison
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

// Map and Set comparison
const map1 = new Map([['key', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqual(map1, map2); // true

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
isEqual(set1, set2); // true
```

Frequently used in unit testing.

```typescript
import { isEqual } from 'es-toolkit/predicate';

function testApiResponse() {
  const expected = { status: 200, data: { message: 'success' } };
  const actual = { status: 200, data: { message: 'success' } };

  if (isEqual(expected, actual)) {
    console.log('Test passed!');
  } else {
    console.log('Test failed!');
  }
}
```

#### Parameters

- `a` (`unknown`): The first value to compare.
- `b` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the two values are deeply equal, `false` otherwise.
