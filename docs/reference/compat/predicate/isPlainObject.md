# isPlainObject (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isPlainObject](../../predicate/isPlainObject.md) instead

This `isPlainObject` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isPlainObject](../../predicate/isPlainObject.md) instead.

:::

Checks if a value is a plain object.

```typescript
const result = isPlainObject(object);
```

## Reference

### `isPlainObject(object)`

Use `isPlainObject` when you want to check if a value is a plain object. A plain object is an object created by the `{}` literal, `new Object()`, or `Object.create(null)`. It also works as a type guard in TypeScript.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// Plain objects
isPlainObject({}); // true
isPlainObject(new Object()); // true
isPlainObject(Object.create(null)); // true
isPlainObject({ name: 'John', age: 30 }); // true

// Not plain objects
isPlainObject([]); // false (array)
isPlainObject(new Date()); // false (Date instance)
isPlainObject(new Map()); // false (Map instance)
isPlainObject(new Set()); // false (Set instance)
isPlainObject(/regex/); // false (regular expression)
isPlainObject(function () {}); // false (function)
isPlainObject(null); // false
isPlainObject(undefined); // false
isPlainObject('object'); // false (string)
isPlainObject(42); // false (number)
```

It distinguishes between class instances and plain objects.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('John');
const plainObj = { name: 'John' };

isPlainObject(person); // false (class instance)
isPlainObject(plainObj); // true (plain object)
```

It also correctly handles custom `Symbol.toStringTag` properties.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// Writable Symbol.toStringTag
const obj1 = {};
obj1[Symbol.toStringTag] = 'CustomObject';
isPlainObject(obj1); // true

// Read-only Symbol.toStringTag (built-in objects)
const date = new Date();
isPlainObject(date); // false
```

#### Parameters

- `object` (`any`): The value to check if it's a plain object.

#### Returns

(`boolean`): Returns `true` if the value is a plain object, `false` otherwise.
