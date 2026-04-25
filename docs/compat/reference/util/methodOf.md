# methodOf (Lodash Compatibility)

Creates a function that takes a path and invokes a method on the given object with predefined arguments.

```typescript
const pathInvoker = methodOf(object, ...args);
```

## Usage

### `methodOf(object, ...args)`

Creates a function that calls a method on a specific object with predefined arguments. Unlike `method`, this fixes the object and allows you to specify the path later. This is useful when you want to call different methods on the same object with the same arguments.

```typescript
import { methodOf } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// Pre-bind the object and arguments
const callMethod = methodOf(object, 1, 2);
console.log(callMethod('a.b')); // => 3

// Call multiple paths with the same object and arguments
const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
};

const compute = methodOf(calculator, 10, 5);
console.log(compute('add')); // => 15
console.log(compute('multiply')); // => 50
console.log(compute('subtract')); // => 5
```

It can also be used with nested objects.

```typescript
import { methodOf } from 'es-toolkit/compat';

const data = {
  users: {
    findById: function (id) {
      return `User ${id}`;
    },
    findByName: function (name) {
      return `Found ${name}`;
    },
  },
};

const userFinder = methodOf(data, 'john');
userFinder('users.findById'); // => 'User john'
userFinder('users.findByName'); // => 'Found john'
```

#### Parameters

- `object` (`object`): The object to invoke methods on.
- `...args` (`any[]`): The arguments to pass to the methods.

#### Returns

(`(path: PropertyKey | PropertyKey[]) => any`): Returns a function that takes a path and calls the method at the specified path on the object with the given arguments.
