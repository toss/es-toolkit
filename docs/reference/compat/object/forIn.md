# forIn (Lodash Compatibility)

::: warning Use `Object.keys` and `for...in` loop instead

This `forIn` function operates slowly due to handling `null` or `undefined`, setting up default `iteratee`, and more.

Instead, use the faster and more modern `Object.keys` and `for...in` loop.

:::

Iterates over all properties of an object (including inherited properties) and invokes a function for each property.

```typescript
const result = forIn(obj, iteratee);
```

## Reference

### `forIn(object, iteratee)`

Iterates over all properties of an object and invokes the `iteratee` function. It iterates not only over the object's own properties but also over properties inherited through the prototype chain. If the `iteratee` function returns `false`, the iteration stops.

```typescript
import { forIn } from 'es-toolkit/compat';

// Iterate over all properties of an object
const obj = { a: 1, b: 2 };
forIn(obj, (value, key) => {
  console.log(key, value);
});
// Output: 'a' 1, 'b' 2

// Iterate including inherited properties
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forIn(child, (value, key) => {
  console.log(key, value);
});
// Output: 'inherited' 'value', 'own' 'ownValue', 'protoProperty' 'proto'

// Early exit based on condition
forIn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // Stop after 'a'
});
// Output: 'a' 1
```

`null` or `undefined` is returned as is.

```typescript
import { forIn } from 'es-toolkit/compat';

forIn(null, iteratee); // null
forIn(undefined, iteratee); // undefined
```

#### Parameters

- `object` (`T | null | undefined`): The object to iterate over.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, optional): The function to invoke for each property. Defaults to the `identity` function.

#### Returns

(`T | null | undefined`): Returns the original object.
