# isFunction

Checks if a value is a function.

```typescript
const result = isFunction(value);
```

## Usage

### `isFunction(value)`

Use `isFunction` when you want to check if a value is a function. Can detect all types of functions including regular functions, async functions, generator functions, and constructor functions.

```typescript
import { isFunction } from 'es-toolkit/predicate';

// Regular functions
console.log(isFunction(function () {})); // true
console.log(isFunction(() => {})); // true
console.log(isFunction(Array.prototype.slice)); // true

// Async functions
console.log(isFunction(async function () {})); // true
console.log(isFunction(async () => {})); // true

// Generator functions
console.log(isFunction(function* () {})); // true

// Constructors
console.log(isFunction(Array)); // true
console.log(isFunction(Date)); // true
console.log(isFunction(RegExp)); // true
console.log(isFunction(Promise)); // true
```

Also detects built-in JavaScript functions and classes:

```typescript
// Built-in constructors
console.log(isFunction(Object)); // true
console.log(isFunction(String)); // true
console.log(isFunction(Number)); // true
console.log(isFunction(Boolean)); // true

// Typed array constructors
console.log(isFunction(Int8Array)); // true
console.log(isFunction(Uint8Array)); // true
console.log(isFunction(Float32Array)); // true

// Proxy and Reflect
console.log(isFunction(Proxy)); // true
console.log(isFunction(Reflect.get)); // true
```

Distinguishes from non-function values:

```typescript
// Non-functions
console.log(isFunction({})); // false
console.log(isFunction([])); // false
console.log(isFunction('text')); // false
console.log(isFunction(42)); // false
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false

// Function-like but not functions
console.log(isFunction({ call: function () {} })); // false
```

Useful for callback function validation or dynamic function invocation:

```typescript
// Callback function validation
function processData(data: any[], callback?: unknown) {
  const result = data.map(item => item * 2);

  if (isFunction(callback)) {
    // Can safely call callback since it's confirmed to be a function
    callback(result);
  }

  return result;
}

// Dynamic function execution
function executeIfFunction(fn: unknown, ...args: any[]) {
  if (isFunction(fn)) {
    return fn(...args);
  }

  console.log('Given value is not a function');
  return null;
}

// Checking functions in method chaining
const utils = {
  data: [1, 2, 3],
  process(fn: unknown) {
    if (isFunction(fn)) {
      this.data = this.data.map(fn);
    }
    return this;
  },
};
```

#### Parameters

- `value` (`unknown`): The value to check if it's a function.

#### Returns

(`value is (...args: any[]) => any`): Returns `true` if the value is a function, `false` otherwise.
