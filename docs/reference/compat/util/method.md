# method (Lodash Compatibility)

Creates a function that invokes a method at the specified path with the given arguments.

```typescript
const methodFunc = method(path, ...args);
```

## Usage

### `method(path, ...args)`

Creates a function that calls a method at a specific path on an object with predefined arguments. This is useful for reusing method calls in functional programming or with array methods like `map`.

```typescript
import { method } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// Create a method calling function
const add = method('a.b', 1, 2);
console.log(add(object)); // => 3

// Call methods on each object in an array
const objects = [{ calc: { sum: (a, b) => a + b } }, { calc: { sum: (a, b) => a * b } }];

const calculate = method('calc.sum', 5, 3);
objects.map(calculate); // => [8, 15]
```

It can handle nested paths as well.

```typescript
import { method } from 'es-toolkit/compat';

const obj = {
  users: {
    getName: function (prefix) {
      return prefix + this.name;
    },
    name: 'John',
  },
};

const getUserName = method('users.getName', 'Mr. ');
getUserName(obj); // => 'Mr. John'
```

#### Parameters

- `path` (`PropertyKey | PropertyKey[]`): The path of the method to invoke.
- `...args` (`any[]`): The arguments to pass to the method.

#### Returns

(`(object: any) => any`): Returns a function that takes an object and calls the method at the specified path with the given arguments.
