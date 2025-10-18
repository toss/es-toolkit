# asyncNoop

异步地什么都不做的函数。

```typescript
const promise = asyncNoop();
```

::: info [`noop`](./noop.md) 函数

如果需要同步地什么都不做的函数,请使用直接返回 `void` 的 `noop` 函数。

:::

## 参考

### `asyncNoop()`

当您想在需要异步函数的地方填充空位或用作默认值时,请使用 `asyncNoop`。它返回一个解析为 `undefined` 的 `Promise`。

```typescript
import { asyncNoop } from 'es-toolkit/function';

// 用作默认值的示例
interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // fetchData 始终是一个函数,因此可以安全调用
    await fetchData();
  };

  handleFetchData();
}

// 直接调用的示例
asyncNoop();
// Returns: Promise<void>

await asyncNoop();
// Returns: undefined
```

#### 返回值

(`Promise<void>`): 解析为 `undefined` 的 `Promise`。
