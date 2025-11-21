# keysIn (Lodash compatibility)

::: warning Use `for...in` loop or `Object.keys`

This `keysIn` function operates slowly due to complex logic such as handling array-like objects and traversing the prototype chain.

Use the faster and more modern `for...in` loop or `Object.keys()` as needed instead.

:::

Returns an array of all enumerable property names of an object, including inherited properties.

```typescript
const allKeys = keysIn(object);
```

## Usage

### `keysIn(object)`

Use `keysIn` when you want to get all property names of an object including inherited properties. Unlike `keys`, it also returns properties from the prototype chain.

```typescript
import { keysIn } from 'es-toolkit/compat';

// Keys of a basic object
const object = { a: 1, b: 2 };
keysIn(object);
// => ['a', 'b']

// Indices of an array
const array = [1, 2, 3];
keysIn(array);
// => ['0', '1', '2']

// Indices of a string
keysIn('hello');
// => ['0', '1', '2', '3', '4']
```

It also includes inherited properties.

```typescript
import { keysIn } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keysIn(new Foo());
// => ['a', 'b', 'c'] (includes prototype property 'c')

// constructor is excluded
class MyClass {
  constructor() {
    this.prop = 1;
  }
  method() {}
}
MyClass.prototype.inherited = 2;

keysIn(new MyClass());
// => ['prop', 'method', 'inherited'] (constructor is excluded)
```

It specially handles array-like objects.

```typescript
import { keysIn } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keysIn(typedArray);
// => ['0', '1', '2'] (excludes buffer, byteLength, etc.)

// arguments object
function example() {
  return keysIn(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

It safely handles `null` or `undefined`.

```typescript
import { keysIn } from 'es-toolkit/compat';

keysIn(null);
// => []

keysIn(undefined);
// => []
```

#### Parameters

- `object` (`any`): The object to get keys from.

#### Returns

(`string[]`): Returns an array of all enumerable property names (including both own and inherited properties) of the object.
