# functionsIn (Lodash compatibility)

::: warning Use `for...in` loop and `typeof` check instead

This `functionsIn` function operates slowly due to the `for...in` loop and function checking process.

Instead, use the faster and more modern `for...in` loop and `typeof` check.

:::

Returns an array of the names of all properties (including inherited properties) of an object that are functions.

```typescript
const functionNames = functionsIn(obj);
```

## Reference

### `functionsIn(object)`

Checks all properties of an object and returns an array of only the names of properties that are functions. It checks not only the object's own properties but also all properties inherited through the prototype chain. This is useful for finding all methods (including inherited methods) of an object.

```typescript
import { functionsIn } from 'es-toolkit/compat';

// Basic usage
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functionsIn(obj);
// Result: ['greet', 'calculate']

// Including inherited functions
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
const allMethods = functionsIn(calc);
// Result: ['add', 'multiply', 'divide'] (including inherited methods)

// Inheritance through prototype chain
function Parent() {
  this.parentMethod = function () {
    return 'parent';
  };
}
Parent.prototype.protoMethod = function () {
  return 'proto';
};

function Child() {
  Parent.call(this);
  this.childMethod = function () {
    return 'child';
  };
}
Child.prototype = Object.create(Parent.prototype);

const child = new Child();
const inheritedFunctions = functionsIn(child);
// Result: ['parentMethod', 'childMethod', 'protoMethod']
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { functionsIn } from 'es-toolkit/compat';

functionsIn(null); // []
functionsIn(undefined); // []
```

#### Parameters

- `object` (`any`): The object to inspect.

#### Returns

(`string[]`): Returns an array of the names of properties that are functions (including inherited functions).
