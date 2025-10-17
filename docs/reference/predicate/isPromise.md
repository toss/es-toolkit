# isPromise

Checks if a given value is a `Promise` instance.

```typescript
const result = isPromise(value);
```

## Reference

### `isPromise(value)`

Use `isPromise` when you want to check if a value is a `Promise` instance. It's useful when you need to distinguish `Promise` objects from other values in asynchronous code, or when you need to conditionally use `await`.

```typescript
import { isPromise } from 'es-toolkit/predicate';

// Promise instances
const promise1 = new Promise(resolve => resolve('done'));
const promise2 = Promise.resolve(42);
const promise3 = Promise.reject(new Error('failed'));

console.log(isPromise(promise1)); // true
console.log(isPromise(promise2)); // true
console.log(isPromise(promise3)); // true

// Non-Promise values
console.log(isPromise({})); // false
console.log(isPromise('hello')); // false
console.log(isPromise(42)); // false
console.log(isPromise(null)); // false
console.log(isPromise(undefined)); // false
```

It's useful when executing logic conditionally in asynchronous functions.

```typescript
// Check if value is a Promise and handle appropriately
async function processValue(input: unknown) {
  if (isPromise(input)) {
    // TypeScript infers input as Promise<any>
    const result = await input;
    console.log('Promise result:', result);
    return result;
  }

  // Non-Promise values are returned immediately
  console.log('Regular value:', input);
  return input;
}

// Handle API responses
function handleApiCall(response: unknown) {
  if (isPromise(response)) {
    return response.then(data => ({ success: true, data })).catch(error => ({ success: false, error: error.message }));
  }

  // Already resolved value
  return { success: true, data: response };
}

// Use in utility function
function toPromise<T>(value: T | Promise<T>): Promise<T> {
  if (isPromise(value)) {
    return value;
  }

  return Promise.resolve(value);
}
```

You can distinguish between Promise-like objects and actual Promises.

```typescript
// thenable objects are not Promises
const thenable = {
  then: (resolve: Function) => resolve('not a promise'),
};

console.log(isPromise(thenable)); // false

// async function results are Promises
async function asyncFunction() {
  return 'async result';
}

console.log(isPromise(asyncFunction())); // true

// Regular functions are not Promises
function normalFunction() {
  return 'normal result';
}

console.log(isPromise(normalFunction())); // false
```

It can also be used for error handling.

```typescript
function safeExecute(fn: () => any) {
  try {
    const result = fn();

    if (isPromise(result)) {
      return result.catch(error => {
        console.error('Error in async function:', error);
        return null;
      });
    }

    return result;
  } catch (error) {
    console.error('Error in sync function:', error);
    return null;
  }
}

// Timeout handling
function withTimeout<T>(valueOrPromise: T | Promise<T>, timeoutMs: number) {
  if (!isPromise(valueOrPromise)) {
    return valueOrPromise;
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([valueOrPromise, timeoutPromise]);
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Promise instance.

#### Returns

(`value is Promise<any>`): Returns `true` if the value is a Promise instance, `false` otherwise.
