# before (Lodash Compatibility)

::: warning Use [`before`](../../function/before.md) from `es-toolkit`

This `before` function operates slower due to complex type validation and integer conversion handling.

Instead, use the faster and more modern [before](../../function/before.md) from `es-toolkit`.

:::

Creates a function that executes the original function up to a specified number of times, then returns the last result for subsequent calls.

```typescript
const limitedFunction = before(n, func);
```

## Usage

### `before(n, func)`

Use `before` when you want to restrict a function to execute only up to a certain number of times. This is useful for limiting function call counts or when you want to execute a function only during the initial setup phase.

```typescript
import { before } from 'es-toolkit/compat';

// Basic usage
let count = 0;
const beforeThree = before(3, () => ++count);

console.log(beforeThree()); // 1 (first call)
console.log(beforeThree()); // 2 (second call)
console.log(beforeThree()); // 2 (from third call onwards, returns last result)
console.log(beforeThree()); // 2 (continues to return last result)
```

Alternative using closures:

```typescript
// Using before
const beforeThree = before(3, myFunction);

// Using closures (simpler and faster)
function createBefore(limit, callback) {
  let callCount = 0;
  let lastResult;

  return function (...args) {
    if (callCount < limit - 1) {
      lastResult = callback.apply(this, args);
      callCount++;
    }
    return lastResult;
  };
}

const beforeThreeAlternative = createBefore(3, myFunction);
```

Using as an initialization function:

```typescript
import { before } from 'es-toolkit/compat';

class Database {
  constructor() {
    this.isInitialized = false;

    // Initialization executes only once
    this.initialize = before(2, () => {
      console.log('Initializing database...');
      this.setupConnection();
      this.isInitialized = true;
      return 'Initialization complete';
    });
  }

  setupConnection() {
    // Actual connection setup logic
  }

  query(sql) {
    const initResult = this.initialize();
    console.log(initResult); // First call: "Initialization complete", subsequent: same result

    // Query execution logic
    return `Query executed: ${sql}`;
  }
}

const db = new Database();
db.query('SELECT * FROM users'); // Initialization executed
db.query('SELECT * FROM products'); // Initialization not executed
```

Limiting API calls:

```typescript
import { before } from 'es-toolkit/compat';

// Allow API calls up to 5 times maximum
const limitedApiCall = before(6, endpoint => {
  console.log(`API call: ${endpoint}`);
  return fetch(endpoint).then(res => res.json());
});

// First 5 calls execute actual API calls
limitedApiCall('/api/data1'); // Actual call
limitedApiCall('/api/data2'); // Actual call
limitedApiCall('/api/data3'); // Actual call
limitedApiCall('/api/data4'); // Actual call
limitedApiCall('/api/data5'); // Actual call
limitedApiCall('/api/data6'); // Returns last result (no API call)
```

Limiting event listeners:

```typescript
import { before } from 'es-toolkit/compat';

// Process click events up to 3 times
const limitedClickHandler = before(4, event => {
  console.log('Click processed:', event.target.id);
  return `Processed: ${Date.now()}`;
});

document.getElementById('button').addEventListener('click', limitedClickHandler);
// Only the first 3 clicks are processed, subsequent calls return the last result
```

Handling parameters and return values:

```typescript
import { before } from 'es-toolkit/compat';

const limitedCalculator = before(3, (operation, a, b) => {
  const result = operation === 'add' ? a + b : a - b;
  console.log(`Calculation: ${a} ${operation} ${b} = ${result}`);
  return result;
});

console.log(limitedCalculator('add', 5, 3)); // "Calculation: 5 add 3 = 8", returns: 8
console.log(limitedCalculator('subtract', 10, 4)); // "Calculation: 10 subtract 4 = 6", returns: 6
console.log(limitedCalculator('multiply', 7, 2)); // No calculation, returns: 6 (last result)
```

Passing 0 or 1 prevents the function from executing:

```typescript
import { before } from 'es-toolkit/compat';

const neverCalled = before(0, () => {
  console.log('This function will not execute');
  return 'result';
});

const onceOnly = before(1, () => {
  console.log('This function will also not execute');
  return 'result';
});

console.log(neverCalled()); // undefined
console.log(onceOnly()); // undefined
```

Resource cleanup optimization:

```typescript
import { before } from 'es-toolkit/compat';

// Function references are automatically cleaned up to prevent memory leaks
const limitedProcessor = before(2, data => {
  // Complex data processing
  return processComplexData(data);
});

// After the 2nd call, the original function reference is removed (garbage collection)
```

#### Parameters

- `n` (`number`): The maximum number of times to execute the function. It executes up to n-1 times, and from the nth call onwards, returns the last result.
- `func` (`Function`): The function to restrict.

#### Returns

(`Function`): Returns a new function that executes the original function up to the specified number of times, and thereafter returns the last result.
