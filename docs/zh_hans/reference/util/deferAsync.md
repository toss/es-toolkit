# deferAsync

创建一个 `AsyncDisposable` 对象,在离开作用域时执行异步回调函数。

```typescript
await using cleanup = deferAsync(callback);
```

## 用法

### `deferAsync(callback)`

当你希望在作用域结束时自动执行异步清理代码时,请使用 `deferAsync`。用 [`await using` 声明](https://github.com/tc39/proposal-explicit-resource-management)声明返回的对象后,即使因为错误离开作用域,回调也会在代码块结束时执行并等待完成。

```typescript
import { deferAsync } from 'es-toolkit/util';

async function main() {
  const connection = await connect();
  await using cleanup = deferAsync(async () => {
    await connection.close();
  });

  // 当此函数返回或抛出错误时,连接会自动关闭。
  await connection.query('SELECT 1');
}
```

使用 `await using` 声明需要 TypeScript 5.2 或更高版本,以及支持 Explicit Resource Management 的运行时(Node.js 24 或更高版本、最新的浏览器)。在较旧的环境中,可以转译该语法并添加 `Symbol.asyncDispose` 的 polyfill。

::: info 同步清理请使用 defer

此函数会等待回调完成,因此只能在 async 函数中使用。如果清理代码是同步的,请将 [`defer`](./defer.md) 函数与 `using` 一起使用。

:::

#### 参数

- `callback` (`() => void | PromiseLike<void>`): 对象被释放时执行的清理函数。会等待其返回值完成。

#### 返回值

(`AsyncDisposable`): 返回一个在被释放时执行 `callback` 并等待其完成的对象。
