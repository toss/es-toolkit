# promisify

Converts a callback-based function to a Promise-based function.

Takes a function that accepts a Node.js-style callback `(error, result) => void` as its last argument and returns a new function that returns a Promise. This is useful for modernizing legacy codebases that use callback patterns.

## Signature

```typescript
function promisify<Args extends unknown[], Result>(
  fn: (...args: [...Args, Callback<Result>]) => void,
  options?: PromisifyOptions
): (...args: Args) => Promise<Result>;
```

### Parameters

- `fn` (`(...args: [...Args, Callback<Result>]) => void`): A function that accepts a callback as its last argument. The callback should follow the Node.js convention: `(error, result) => void`.
- `options` (`PromisifyOptions`, optional): Configuration options.
  - `context` (`object`, optional): The `this` context to bind when calling the function. Useful for object methods.

### Returns

(`(...args: Args) => Promise<Result>`): A new function that returns a Promise. The Promise resolves with the callback's result value, or rejects with the callback's error.

## Examples

### Basic usage

```typescript
import { promisify } from 'es-toolkit/promise';

function readFile(path: string, callback: (err: Error | null, data: string) => void) {
  // simulate async file reading
  setTimeout(() => callback(null, 'file content'), 100);
}

const readFileAsync = promisify(readFile);
const data = await readFileAsync('example.txt');
console.log(data); // 'file content'
```

### With context binding

When working with object methods that depend on `this`, use the `context` option:

```typescript
import { promisify } from 'es-toolkit/promise';

const redis = {
  host: 'localhost',
  get(key: string, callback: (err: Error | null, value: string) => void) {
    // uses this.host
    callback(null, `value from ${this.host}`);
  },
};

// Without context, 'this' would be undefined
const redisGet = promisify(redis.get, { context: redis });
const value = await redisGet('myKey');
console.log(value); // 'value from localhost'
```

### Error handling

Errors passed to the callback are converted to Promise rejections:

```typescript
import { promisify } from 'es-toolkit/promise';

function failingOperation(callback: (err: Error | null, result: string) => void) {
  callback(new Error('Operation failed'), '');
}

const failingOperationAsync = promisify(failingOperation);

try {
  await failingOperationAsync();
} catch (error) {
  console.error(error.message); // 'Operation failed'
}
```
