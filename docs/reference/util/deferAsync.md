# deferAsync

Creates an `AsyncDisposable` object that runs an asynchronous callback when its scope exits.

```typescript
await using cleanup = deferAsync(callback);
```

## Usage

### `deferAsync(callback)`

Use `deferAsync` when you want asynchronous cleanup code to run automatically at the end of a scope. Declare the returned object with an [`await using` declaration](https://github.com/tc39/proposal-explicit-resource-management), and the callback runs and is awaited when the enclosing block exits — even if it exits with an error.

```typescript
import { deferAsync } from 'es-toolkit/util';

async function main() {
  const connection = await connect();
  await using cleanup = deferAsync(async () => {
    await connection.close();
  });

  // The connection is closed automatically when this function returns or throws.
  await connection.query('SELECT 1');
}
```

`await using` declarations require TypeScript 5.2 or later, and a runtime that supports Explicit Resource Management, such as Node.js 24 or the latest browsers. In older environments, you can transpile the syntax and polyfill `Symbol.asyncDispose`.

::: info Use defer for synchronous cleanup

This function awaits the callback, so it can only be used in async functions. If your cleanup code is synchronous, use the [`defer`](./defer.md) function with `using` instead.

:::

#### Parameters

- `callback` (`() => void | PromiseLike<void>`): The cleanup function to run when the object is disposed. Its result is awaited.

#### Returns

(`AsyncDisposable`): An object that runs and awaits `callback` when it is disposed.
