# values (Lodash Compatibility)

::: warning Use `Object.values` instead

This `values` function simply calls `Object.values` with unnecessary overhead.

Use the faster and more modern `Object.values()` directly instead.

:::

Returns an array of the object's own enumerable property values.

```typescript
const valueArray = values(obj);
```

## Reference

### `values(obj)`

Use `values` when you want to get all property values of an object as an array. It works the same as `Object.values` but safely handles `null` or `undefined`.

```typescript
import { values } from 'es-toolkit/compat';

// Get object values
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]

// Object with numeric keys
const numberKeyObj = { 0: 'a', 1: 'b', 2: 'c' };
values(numberKeyObj); // => ['a', 'b', 'c']
```

Can also handle arrays or array-like objects.

```typescript
import { values } from 'es-toolkit/compat';

// Array
values([1, 2, 3]); // => [1, 2, 3]

// String (array-like object)
values('hello'); // => ['h', 'e', 'l', 'l', 'o']
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { values } from 'es-toolkit/compat';

values(null); // => []
values(undefined); // => []
```

Only enumerable properties are returned.

```typescript
import { values } from 'es-toolkit/compat';

const obj = Object.create(
  { inherited: 'not included' },
  {
    own: { value: 'included', enumerable: true },
    nonEnum: { value: 'not included', enumerable: false }
  }
);

values(obj); // => ['included']
```

#### Parameters

- `obj` (`Record<PropertyKey, T> | ArrayLike<T> | null | undefined`): The object to get property values from.

#### Returns

(`T[]`): Returns an array of the object's enumerable property values.
