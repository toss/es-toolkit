# forOwn (Lodash compatibility)

::: warning Use `Object.keys` with a loop instead

This `forOwn` function operates slowly due to internally calling the `keys` function, object conversion processes, and handling of `null` or `undefined`.

Instead, use the faster and more modern `Object.keys` with a loop.

:::

Iterates over only the object's own properties, calling a function for each property.

```typescript
const result = forOwn(obj, iteratee);
```

## Usage

### `forOwn(object, iteratee)`

Iterates over only the object's own properties, calling the `iteratee` function. It iterates only over properties directly owned by the object, excluding inherited properties and `Symbol` keys. If the `iteratee` function returns `false`, iteration stops.

```typescript
import { forOwn } from 'es-toolkit/compat';

// Iterate over only own properties of the object
const obj = { a: 1, b: 2 };
forOwn(obj, (value, key) => {
  console.log(key, value);
});
// Output: 'a' 1, 'b' 2

// Exclude inherited properties
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwn(child, (value, key) => {
  console.log(key, value);
});
// Output: 'inherited' 'value', 'own' 'ownValue' (protoProperty is excluded)

// Early termination based on condition
forOwn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // Stop after 'a'
});
// Output: 'a' 1
```

Returns `null` or `undefined` as is.

```typescript
import { forOwn } from 'es-toolkit/compat';

forOwn(null, iteratee); // null
forOwn(undefined, iteratee); // undefined
```

#### Parameters

- `object` (`T | null | undefined`): The object to iterate over.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, optional): The function to call for each property. Defaults to the `identity` function.

#### Returns

(`T | null | undefined`): Returns the original object.
