# curryRight (Lodash Compatibility)

::: warning Use `es-toolkit`'s [`curryRight`](../../function/curryRight.md) or manual closures instead

This `curryRight` function operates slowly due to complex placeholder handling, arity validation, and argument composition logic.

If you don't need placeholders, use the faster `es-toolkit`'s [`curryRight`](../../function/curryRight.md) or simple closures instead.

:::

Curries a function from right to left, creating a function that accepts arguments one at a time or several at a time, starting from the last argument.

```typescript
const curriedFunction = curryRight(func, arity);
```

## Usage

### `curryRight(func, arity)`

Use `curryRight` when you want to curry a function from right to left and partially apply arguments starting from the last one. Unlike regular `curry`, it processes arguments starting from the last one first.

```typescript
import { curryRight } from 'es-toolkit/compat';

// Basic usage
function subtract(a, b, c) {
  return a - b - c;
}

const curriedSubtract = curryRight(subtract);

// Currying from right (starting from last argument)
console.log(curriedSubtract(1)(2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1, 2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1)(2, 5)); // 2 - 5 - 1 = -4
console.log(curriedSubtract(1, 2, 5)); // 1 - 2 - 5 = -6
```

Difference between `curry` and `curryRight`:

```typescript
import { curry, curryRight } from 'es-toolkit/compat';

function divide(a, b, c) {
  return a / b / c;
}

// Regular curry (from left)
const leftCurried = curry(divide);
console.log(leftCurried(12)(3)(2)); // ((12 / 3) / 2) = 2

// curryRight (from right)
const rightCurried = curryRight(divide);
console.log(rightCurried(2)(3)(12)); // ((12 / 3) / 2) = 2
// The last provided 12 becomes the first argument (a)
```

Comparison with main library:

```typescript
// compat version (flexible, but slower)
import { curryRight } from 'es-toolkit/compat';
const curriedCompat = curryRight(subtract);
curriedCompat(1, 2)(3); // supported
curriedCompat(1)(curryRight.placeholder, 3)(2); // placeholder supported

// main library version (faster, but one at a time only)
import { curryRight } from 'es-toolkit';
const curriedMain = curryRight(subtract);
curriedMain(1)(2)(3); // supported
curriedMain(1, 2)(3); // not supported
```

Using placeholder feature:

```typescript
import { curryRight } from 'es-toolkit/compat';

function formatMessage(name, action, time) {
  return `${name} did ${action} at ${time}`;
}

const curriedFormat = curryRight(formatMessage);

// Skip specific positions with placeholder
const todayAction = curriedFormat('today');
const todayLoginAction = todayAction(curryRight.placeholder, 'login');

console.log(todayLoginAction('John'));
// "John did login at today"

// Fix time first
const morningFormat = curriedFormat('9 AM');
console.log(morningFormat('comment', 'Jane'));
// "Jane did comment at 9 AM"
```

Using in array processing:

```typescript
import { curryRight } from 'es-toolkit/compat';

// Take a specific number of items from the end of an array
function takeFromEnd(array, count, separator = ', ') {
  return array.slice(-count).join(separator);
}

const curriedTake = curryRight(takeFromEnd);

// Create function that separates with comma
const takeWithComma = curriedTake(', ');

// Get last 3 items
const takeLast3 = takeWithComma(3);

const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
console.log(takeLast3(fruits)); // "orange, grape, kiwi"

// Use different separator
const takeWithDash = curriedTake(' - ');
console.log(takeWithDash(2, fruits)); // "grape - kiwi"
```

Using in function composition:

```typescript
import { curryRight } from 'es-toolkit/compat';

// Log output function
function logWithPrefix(message, level, timestamp) {
  return `[${timestamp}] ${level}: ${message}`;
}

const curriedLog = curryRight(logWithPrefix);

// Fix with current time
const currentTimeLog = curriedLog(new Date().toISOString());

// Create loggers by level
const errorLog = currentTimeLog('ERROR');
const infoLog = currentTimeLog('INFO');
const debugLog = currentTimeLog('DEBUG');

// Usage
console.log(errorLog('Database connection failed'));
console.log(infoLog('Server started'));
console.log(debugLog('Processing user request'));
```

Functional programming pipeline:

```typescript
import { curryRight } from 'es-toolkit/compat';

// Data transformation functions
const mapWith = curryRight((array, fn) => array.map(fn));
const filterWith = curryRight((array, predicate) => array.filter(predicate));
const reduceWith = curryRight((array, reducer, initial) => array.reduce(reducer, initial));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Define transformation functions
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, val) => acc + val;

// Compose pipeline (right first)
const processNumbers = nums => {
  return reduceWith(filterWith(mapWith(nums, double), isEven), sum, 0);
};

console.log(processNumbers(numbers)); // Double all numbers, filter even ones, then sum
```

API request builder:

```typescript
import { curryRight } from 'es-toolkit/compat';

function makeRequest(url, method, headers, body) {
  return fetch(url, { method, headers, body });
}

const curriedRequest = curryRight(makeRequest);

// Set body first
const withJsonBody = curriedRequest(JSON.stringify({ data: 'test' }));

// Add headers
const withHeaders = withJsonBody({
  'Content-Type': 'application/json',
  Authorization: 'Bearer token123',
});

// Set POST method
const postRequest = withHeaders('POST');

// Final usage
postRequest('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

Manual currying alternative:

```typescript
// Using curryRight
const curriedSubtract = curryRight((a, b, c) => a - b - c);

// Manual closure (faster, from right)
const manualCurryRight = c => b => a => a - b - c;

// Both give same result
console.log(curriedSubtract(1)(2)(5)); // 2
console.log(manualCurryRight(1)(2)(5)); // 2
```

Specifying arity:

```typescript
import { curryRight } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return { a, b, c, rest };
}

// Limit arity to 3 (ignore rest)
const curriedFixed = curryRight(variableArgsFunction, 3);

// Receive in order c, b, a from right
console.log(curriedFixed(3)(2)(1)); // { a: 1, b: 2, c: 3, rest: [] }
```

#### Parameters

- `func` (`Function`): The function to curry from right to left.
- `arity` (`number`, optional): The arity (number of arguments) of the function. If omitted, `func.length` is used.

#### Returns

(`Function & { placeholder: symbol }`): Returns a function curried from right to left. The `placeholder` property can be used to control argument positions.
