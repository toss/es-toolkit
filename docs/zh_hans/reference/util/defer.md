# defer

创建一个 `Disposable` 对象,在离开作用域时执行回调函数。

```typescript
using cleanup = defer(callback);
```

## 用法

### `defer(callback)`

当你希望在作用域结束时自动执行清理代码时,请使用 `defer`。用 [`using` 声明](https://github.com/tc39/proposal-explicit-resource-management)声明返回的对象后,即使因为错误离开作用域,回调也会在代码块结束时执行。

```typescript
import { defer } from 'es-toolkit/util';

function processFile() {
  const file = openFile('data.txt');
  using cleanup = defer(() => file.close());

  // 当此函数返回或抛出错误时,文件会自动关闭。
  return file.read();
}
```

如果同一个作用域中有多个 `using` 声明,回调会像栈一样按声明的相反顺序执行。

```typescript
import { defer } from 'es-toolkit/util';

function run() {
  using first = defer(() => console.log('first'));
  using second = defer(() => console.log('second'));
  console.log('body');
}

run();
// 依次输出 'body'、'second'、'first'。
```

使用 `using` 声明需要 TypeScript 5.2 或更高版本,以及支持 Explicit Resource Management 的运行时(Node.js 24 或更高版本、最新的浏览器)。在较旧的环境中,可以转译该语法并添加 `Symbol.dispose` 的 polyfill。

::: info 异步清理请使用 deferAsync

此函数会同步执行回调。如果清理代码是异步的并且需要等待完成,请将 [`deferAsync`](./deferAsync.md) 函数与 `await using` 一起使用。

:::

#### 参数

- `callback` (`() => void`): 对象被释放时执行的清理函数。

#### 返回值

(`Disposable`): 返回一个在被释放时执行 `callback` 的对象。
