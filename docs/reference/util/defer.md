# defer

Creates a `Disposable` object that runs a callback when its scope exits.

```typescript
using cleanup = defer(callback);
```

## Usage

### `defer(callback)`

Use `defer` when you want cleanup code to run automatically at the end of a scope. Declare the returned object with a [`using` declaration](https://github.com/tc39/proposal-explicit-resource-management), and the callback runs when the enclosing block exits — even if it exits with an error.

```typescript
import { defer } from 'es-toolkit/util';

function processFile() {
  const file = openFile('data.txt');
  using cleanup = defer(() => file.close());

  // The file is closed automatically when this function returns or throws.
  return file.read();
}
```

When several `using` declarations appear in the same scope, their callbacks run in reverse declaration order, like a stack.

```typescript
import { defer } from 'es-toolkit/util';

function run() {
  using first = defer(() => console.log('first'));
  using second = defer(() => console.log('second'));
  console.log('body');
}

run();
// Logs 'body', 'second', then 'first'.
```

`using` declarations require TypeScript 5.2 or later, and a runtime that supports Explicit Resource Management, such as Node.js 24 or the latest browsers. In older environments, you can transpile the syntax and polyfill `Symbol.dispose`.

::: info Use deferAsync for asynchronous cleanup

This function runs the callback synchronously. If your cleanup code is asynchronous and should be awaited, use the [`deferAsync`](./deferAsync.md) function with `await using` instead.

:::

#### Parameters

- `callback` (`() => void`): The cleanup function to run when the object is disposed.

#### Returns

(`Disposable`): An object that runs `callback` when it is disposed.
