# toPlainObject (Lodash Compatibility)

::: warning Use Object.assign or spread operator instead

This `toPlainObject` function performs slowly due to complex prototype handling and key enumeration.

Use the faster and more modern Object.assign({}, obj) or {...obj} instead.

:::

Converts a value to a plain object.

```typescript
const plainObj = toPlainObject(value);
```

## Usage

### `toPlainObject(value)`

Converts a value to a plain object. Flattens inherited enumerable string key properties to own properties.

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// Constructor function and prototype
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

const foo = new Foo();
toPlainObject(foo);
// Returns: { b: 2, c: 3 }

// Convert array to object
toPlainObject([1, 2, 3]);
// Returns: { 0: 1, 1: 2, 2: 3 }
```

It handles various object types.

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// Convert string to object
toPlainObject('abc');
// Returns: { 0: 'a', 1: 'b', 2: 'c' }

// Already plain object
const obj = { a: 1, b: 2 };
toPlainObject(obj);
// Returns: { a: 1, b: 2 }
```

#### Parameters

- `value` (`any`): The value to convert.

#### Returns

(`any`): Returns a plain object with inherited enumerable properties flattened to own properties.
