# isEqualWith (Lodash Compatibility)

::: warning Use es-toolkit's [isEqualWith](../../predicate/isEqualWith.md) instead
This `isEqualWith` function operates slowly due to complex processing for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isEqualWith](../../predicate/isEqualWith.md) instead.
:::

Checks if two values are equal using a custom comparison function.

```typescript
const result = isEqualWith(a, b, customizer);
```

## Reference

### `isEqualWith(a, b, areValuesEqual?)`

Deeply compares two values using a custom comparison function. If the custom function returns a boolean value, that result is used. If it returns `undefined`, the default equality comparison is used.

The custom comparison function is also used when comparing values inside complex structures like objects, arrays, Map, Set, etc., ensuring deep comparison.

```typescript
import { isEqualWith } from 'es-toolkit/compat';

// Case-insensitive string comparison
const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true

// Compare numbers by absolute value
const absCustomizer = (a: any, b: any) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a) === Math.abs(b);
  }
};

isEqualWith([-1, 2], [1, -2], absCustomizer); // true

// Complex object comparison
const obj1 = {
  name: 'JOHN',
  details: { age: 30, city: 'NYC' },
};
const obj2 = {
  name: 'john',
  details: { age: 30, city: 'nyc' },
};

isEqualWith(obj1, obj2, customizer); // true
```

Special handling for Map and Set:

```typescript
import { isEqualWith } from 'es-toolkit/compat';

const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

const map1 = new Map([['KEY', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqualWith(map1, map2, customizer); // true

const set1 = new Set(['HELLO']);
const set2 = new Set(['hello']);
isEqualWith(set1, set2, customizer); // true
```

#### Parameters

- `a` (`any`): The first value to compare.
- `b` (`any`): The second value to compare.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): The custom comparison function.
  - `x`: Value from the first object `a`
  - `y`: Value from the second object `b`
  - `property`: The property key used to get `x` and `y`
  - `xParent`: The parent object of the first value `x`
  - `yParent`: The parent object of the second value `y`
  - `stack`: Internal stack (Map) for handling circular references

#### Returns

(`boolean`): Returns `true` if the values are equal according to the custom function, `false` otherwise.
