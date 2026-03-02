# curry (Lodash Compatibility)

::: warning Use `es-toolkit`'s `curry` or manual closures
This `curry` function performs slowly due to complex placeholder handling, arity validation, and argument composition logic.

If you don't need placeholders, use the faster `es-toolkit`'s [`curry`](../../function/curry.md) or simple closures instead.
:::

Curries a function so it can accept arguments one at a time or multiple at once.

```typescript
const curriedFunction = curry(func, arity);
```

## Usage

### `curry(func, arity)`

Use `curry` when you want to curry a function to make partial application easier. It's useful for providing arguments step by step or using placeholders to provide arguments at specific positions later.

```typescript
import { curry } from 'es-toolkit/compat';

// Basic usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// Can be called in various ways
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

Comparison with main library curry:

```typescript
// compat version (flexible, but slower)
import { curry } from 'es-toolkit/compat';
const curriedCompat = curry(add);
curriedCompat(1, 2)(3); // supported
curriedCompat(1)(curry.placeholder, 3)(2); // placeholder support

// main library version (faster, but one at a time only)
import { curry } from 'es-toolkit';
const curriedMain = curry(add);
curriedMain(1)(2)(3); // supported
curriedMain(1, 2)(3); // not supported
```

Using placeholder feature:

```typescript
import { curry } from 'es-toolkit/compat';

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const curriedGreet = curry(greet);

// Skip middle arguments with placeholder
const greetWithExclamation = curriedGreet(curry.placeholder, curry.placeholder, '!');
console.log(greetWithExclamation('Hello', 'John')); // "Hello, John!"

const sayHello = curriedGreet('Hello');
console.log(sayHello(curry.placeholder, '~')('Jane')); // "Hello, Jane~"
```

Using in functional programming:

```typescript
import { curry } from 'es-toolkit/compat';

// Create mapping functions
const map = curry((fn, array) => array.map(fn));
const filter = curry((predicate, array) => array.filter(predicate));

const numbers = [1, 2, 3, 4, 5];

// Create reusable functions
const double = x => x * 2;
const isEven = x => x % 2 === 0;

const mapDouble = map(double);
const filterEven = filter(isEven);

console.log(mapDouble(numbers)); // [2, 4, 6, 8, 10]
console.log(filterEven(numbers)); // [2, 4]

// Function composition
const processNumbers = nums => mapDouble(filterEven(nums));
console.log(processNumbers(numbers)); // [4, 8]
```

Configuring API client:

```typescript
import { curry } from 'es-toolkit/compat';

function apiRequest(method, baseUrl, endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    ...options,
  });
}

const curriedApiRequest = curry(apiRequest);

// Create specialized functions with default settings
const apiGet = curriedApiRequest('GET', 'https://api.example.com');
const apiPost = curriedApiRequest('POST', 'https://api.example.com');

// Include authentication headers
const authenticatedPost = apiPost(curry.placeholder, {
  headers: { Authorization: 'Bearer token123' },
});

// Usage
apiGet('/users'); // GET https://api.example.com/users
authenticatedPost('/users'); // POST with auth headers
```

Mathematical operation functions:

```typescript
import { curry } from 'es-toolkit/compat';

const calculate = curry((operation, a, b) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('Unsupported operation');
  }
});

// Specialized operation functions
const add = calculate('+');
const subtract = calculate('-');
const multiply = calculate('*');

console.log(add(5, 3)); // 8
console.log(subtract(10)(4)); // 6
console.log(multiply(3, 4)); // 12

// Fix second operand with placeholder
const addFive = calculate('+', curry.placeholder, 5);
console.log(addFive(10)); // 15
```

Specifying arity:

```typescript
import { curry } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return [a, b, c, rest];
}

// Limit arity to 3
const curriedFixed = curry(variableArgsFunction, 3);

console.log(curriedFixed(1)(2)(3)); // [1, 2, 3, []]
console.log(curriedFixed(1, 2)(3)); // [1, 2, 3, []]

// Use without arity (default: function.length)
const curriedDefault = curry(variableArgsFunction); // arity = 3
```

Simple currying alternative:

```typescript
// Using curry
const curriedAdd = curry((a, b, c) => a + b + c);

// Manual closure (faster)
const manualCurry = a => b => c => a + b + c;

// Both produce the same result
console.log(curriedAdd(1)(2)(3)); // 6
console.log(manualCurry(1)(2)(3)); // 6
```

Constructor functions are also supported:

```typescript
import { curry } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

const CurriedPerson = curry(Person);
const SeoulPerson = CurriedPerson(curry.placeholder, curry.placeholder, 'Seoul');

const person1 = new SeoulPerson('John', 30);
const person2 = new SeoulPerson('Jane', 25);

console.log(person1.city); // "Seoul"
console.log(person2.city); // "Seoul"
```

#### Parameters

- `func` (`Function`): The function to curry.
- `arity` (`number`, optional): The arity (number of arguments) of the function. If omitted, `func.length` is used.

#### Returns

(`Function & { placeholder: symbol }`): Returns the curried function. The `placeholder` property allows you to control argument positions.
