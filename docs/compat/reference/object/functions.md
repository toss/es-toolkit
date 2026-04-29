# functions (Lodash compatibility)

::: warning Use `Object.keys` and `typeof` check

This `functions` function operates slowly as it internally goes through the `keys` function and filtering process.

Instead, use the faster and more modern `Object.keys` and `typeof` check.

:::

Returns an array of the names of the object's own properties that are functions.

```typescript
const functionNames = functions(obj);
```

## Usage

### `functions(object)`

Checks the object's own properties and returns an array of only the names of properties that are functions. It excludes inherited properties and `Symbol` keys, checking only string key properties that the object directly owns. This is useful when finding methods of an object or handling only function properties separately.

```typescript
import { functions } from 'es-toolkit/compat';

// Basic usage
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functions(obj);
// Result: ['greet', 'calculate']

// Finding functions in a class instance
class Calculator {
  constructor() {
    this.value = 0;
    this.add = function (n) {
      this.value += n;
    };
  }

  multiply(n) {
    this.value *= n;
  }
}

Calculator.prototype.divide = function (n) {
  this.value /= n;
};

const calc = new Calculator();
const methods = functions(calc);
// Result: ['add'] (inherited multiply, divide are excluded)

// Object with no functions
const data = { x: 1, y: 2, z: 'text' };
const noFunctions = functions(data);
// Result: []
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { functions } from 'es-toolkit/compat';

functions(null); // []
functions(undefined); // []
```

#### Parameters

- `object` (`any`): The object to check.

#### Returns

(`string[]`): Returns an array of the names of properties that are functions.
