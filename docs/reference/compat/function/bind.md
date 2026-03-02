# bind (Lodash Compatibility)

::: warning Use `Function.prototype.bind()`

This `bind` function operates slowly due to complex placeholder handling, constructor function checking, and argument merging logic. If you don't need placeholders, the native `Function.prototype.bind()` is faster and simpler.

Use the faster and standard `Function.prototype.bind()` instead.

:::

Creates a function that fixes the `this` context and provides some arguments in advance.

```typescript
const boundFunction = bind(func, thisObj, ...partialArgs);
```

## Usage

### `bind(func, thisObj, ...partialArgs)`

Use `bind` when you want to fix the `this` context of a function or provide some arguments in advance. It's especially useful when you want to use placeholders to provide arguments at specific positions later.

```typescript
import { bind } from 'es-toolkit/compat';

// Basic usage
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'John' };
const boundGreet = bind(greet, object, 'Hello');

console.log(boundGreet('!')); // "Hello John!"
console.log(boundGreet('~')); // "Hello John~"
```

Comparison with native bind:

```typescript
// Using bind
import { bind } from 'es-toolkit/compat';

const boundFn1 = bind(func, thisObj, 'arg1');

// Using native bind (faster)
const boundFn2 = func.bind(thisObj, 'arg1');

// Results are the same but native is faster
```

Using placeholder functionality:

```typescript
import { bind } from 'es-toolkit/compat';

function calculate(operation, a, b, suffix) {
  return `${a} ${operation} ${b} = ${operation === '+' ? a + b : a - b}${suffix}`;
}

// Provide arguments at specific positions later using placeholders
const calcWithSuffix = bind(
  calculate,
  null,
  bind.placeholder, // operation will be provided later
  bind.placeholder, // a will be provided later
  bind.placeholder, // b will be provided later
  ' points' // suffix is provided in advance
);

console.log(calcWithSuffix('+', 5, 3)); // "5 + 3 = 8 points"
console.log(calcWithSuffix('-', 10, 4)); // "10 - 4 = 6 points"
```

More practical placeholder example:

```typescript
import { bind } from 'es-toolkit/compat';

function apiRequest(method, url, options, callback) {
  // API request logic
  console.log(`${method} ${url}`, options);
  callback(`${method} request complete`);
}

// Create a partially applied function for POST requests
const postRequest = bind(
  apiRequest,
  null,
  'POST', // method fixed
  bind.placeholder, // url will be provided later
  { 'Content-Type': 'application/json' }, // options fixed
  bind.placeholder // callback will be provided later
);

postRequest('/api/users', result => {
  console.log(result); // "POST request complete"
});

postRequest('/api/products', result => {
  console.log(result); // "POST request complete"
});
```

Method binding:

```typescript
import { bind } from 'es-toolkit/compat';

class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(level, message) {
    console.log(`[${this.prefix}] ${level}: ${message}`);
  }
}

const logger = new Logger('MyApp');

// Bind method to use in a different context
const logError = bind(logger.log, logger, 'ERROR');
const logInfo = bind(logger.log, logger, 'INFO');

// Now can be used independently
setTimeout(() => logError('Server connection failed'), 1000);
setTimeout(() => logInfo('Application started'), 2000);
```

Using in event handlers:

```typescript
import { bind } from 'es-toolkit/compat';

class ButtonHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  handleClick(event, customData) {
    this.clickCount++;
    console.log(`${this.name} button clicked #${this.clickCount}`);
    console.log('Custom data:', customData);
    console.log('Event type:', event.type);
  }
}

const handler = new ButtonHandler('Menu');

// Provide custom data in advance, pass event later
const boundHandler = bind(
  handler.handleClick,
  handler,
  bind.placeholder, // event comes later
  'Menu selected' // customData provided in advance
);

// Connect to DOM event (event is automatically passed as first argument)
document.getElementById('menu-btn')?.addEventListener('click', boundHandler);
```

Constructor functions are also supported:

```typescript
import { bind } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city || 'Seoul';
}

// Constructor for creating Seoul residents
const SeoulPerson = bind(Person, null, bind.placeholder, bind.placeholder, 'Seoul');

const person1 = new SeoulPerson('John', 30);
const person2 = new SeoulPerson('Jane', 25);

console.log(person1); // Person { name: 'John', age: 30, city: 'Seoul' }
console.log(person2); // Person { name: 'Jane', age: 25, city: 'Seoul' }
```

Using in functional programming:

```typescript
import { bind } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// Fix parseInt radix to 10
const parseDecimal = bind(parseInt, null, bind.placeholder, 10);

// Safe to use in map
const parsed = ['1', '2', '3'].map(parseDecimal);
console.log(parsed); // [1, 2, 3]

// Problem when using regular parseInt
const problematic = ['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```

#### Parameters

- `func` (`Function`): The function to bind.
- `thisObj` (`any`, optional): The `this` value to bind to the function.
- `partialArgs` (`...any[]`): The arguments to provide in advance. You can use `bind.placeholder` to specify positions to be provided later.

#### Returns

(`Function`): Returns a new function with `this` fixed and some arguments applied in advance.
