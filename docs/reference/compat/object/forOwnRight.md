# forOwnRight (Lodash compatibility)

::: warning Use `Object.keys` and loops
This `forOwnRight` function operates slowly due to internal calls to the `keys` function, object transformation processes, and reverse iteration.

Instead, use the faster and more modern `Object.keys` with loops.

:::

Iterates over only own properties of an object in reverse order, calling a function for each property.

```typescript
const result = forOwnRight(obj, iteratee);
```

## Reference

### `forOwnRight(object, iteratee)`

Iterates over only own properties of an object in reverse order, calling the `iteratee` function. It iterates only over properties directly owned by the object in reverse order, excluding inherited properties and `Symbol` keys. Since it collects keys into an array and then iterates in reverse order, it is slower than normal iteration. If the `iteratee` function returns `false`, iteration is stopped.

```typescript
import { forOwnRight } from 'es-toolkit/compat';

// Iterate only own properties in reverse order
const obj = { a: 1, b: 2 };
forOwnRight(obj, (value, key) => {
  console.log(key, value);
});
// Output: 'b' 2, 'a' 1

// Iterate in reverse order excluding inherited properties
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwnRight(child, (value, key) => {
  console.log(key, value);
});
// Output: 'own' 'ownValue', 'inherited' 'value' (protoProperty is excluded)

// Early termination based on condition
forOwnRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // Stop at 'a'
});
// Output: 'b' 2, 'a' 1
```

`null` or `undefined` is returned as is.

```typescript
import { forOwnRight } from 'es-toolkit/compat';

forOwnRight(null, iteratee); // null
forOwnRight(undefined, iteratee); // undefined
```

#### Parameters

- `object` (`T | null | undefined`): The object to iterate over.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, optional): The function to call for each property. Defaults to the `identity` function.

#### Returns

(`T | null | undefined`): Returns the original object.
