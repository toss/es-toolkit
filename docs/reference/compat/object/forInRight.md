# forInRight (Lodash compatibility)

::: warning Use `Object.keys` and `for...in` loops instead

This `forInRight` function performs slowly due to creating key arrays, reverse iteration, and handling `null` or `undefined`.

Instead, use the faster and more modern `Object.keys` and `for...in` loops.

:::

Iterates over all properties of an object (including inherited properties) in reverse order, calling a function for each property.

```typescript
const result = forInRight(obj, iteratee);
```

## Reference

### `forInRight(object, iteratee)`

Iterates over all properties of the object in reverse order, calling the `iteratee` function. It iterates not only over the object's own properties but also over properties inherited through the prototype chain. Since it collects keys into an array and then iterates in reverse order, it's slower than normal iteration. If the `iteratee` function returns `false`, the iteration stops.

```typescript
import { forInRight } from 'es-toolkit/compat';

// Iterate over all properties in reverse order
const obj = { a: 1, b: 2 };
forInRight(obj, (value, key) => {
  console.log(key, value);
});
// Output: 'b' 2, 'a' 1

// Iterate in reverse order including inherited properties
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forInRight(child, (value, key) => {
  console.log(key, value);
});
// Output: 'protoProperty' 'proto', 'own' 'ownValue', 'inherited' 'value'

// Early termination based on condition
forInRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // Stop at 'a'
});
// Output: 'b' 2, 'a' 1
```

`null` or `undefined` is returned as is.

```typescript
import { forInRight } from 'es-toolkit/compat';

forInRight(null, iteratee); // null
forInRight(undefined, iteratee); // undefined
```

#### Parameters

- `object` (`T | null | undefined`): The object to iterate over.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, optional): The function to call for each property. Defaults to the `identity` function.

#### Returns

(`T | null | undefined`): Returns the original object.
