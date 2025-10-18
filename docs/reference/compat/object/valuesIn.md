# valuesIn (Lodash Compatibility)

::: warning Use `Object.values` instead

This `valuesIn` function operates slowly due to complex logic for processing prototype properties.

Use the faster and more modern `Object.values` instead.

:::

Returns an array of all property values from the object, including inherited prototype properties.

```typescript
const values = valuesIn(obj);
```

## Reference

### `valuesIn(object)`

Use `valuesIn` when you want to get all property values as an array from an object. Unlike regular `Object.values`, it also includes values of properties inherited from the prototype chain.

```typescript
import { valuesIn } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // [1, 2, 3]

// Also handles arrays
valuesIn([1, 2, 3]); // [1, 2, 3]
```

Includes properties inherited from the prototype.

```typescript
import { valuesIn } from 'es-toolkit/compat';

function Parent() {
  this.a = 1;
}
Parent.prototype.inherited = 'fromParent';

function Child() {
  Parent.call(this);
  this.b = 2;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.childProp = 'childValue';

const obj = new Child();
valuesIn(obj); // [1, 2, 'fromParent', 'childValue'] (constructor excluded)
```

Handles `null` or `undefined` as empty arrays.

```typescript
import { valuesIn } from 'es-toolkit/compat';

valuesIn(null); // []
valuesIn(undefined); // []
```

#### Parameters

- `object` (`any`): The object to query for values.

#### Returns

(`any[]`): Returns an array containing all property values from the object. Includes values of inherited prototype properties.
