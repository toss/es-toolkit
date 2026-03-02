# asyncNoop

非同期で何もしない関数です。

```typescript
const promise = asyncNoop();
```

::: info [`noop`](./noop.md) 関数

同期的に何もしない関数が必要な場合は、直接`void`を返す`noop`関数を使用してください。

:::

## 使用法

### `asyncNoop()`

非同期関数が必要な場所に空白を埋めたりデフォルト値として使用したいときに`asyncNoop`を使用してください。`undefined`で解決する`Promise`を返します。

```typescript
import { asyncNoop } from 'es-toolkit/function';

// デフォルト値として使用する例
interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // fetchDataは常に関数なので安全に呼び出せます
    await fetchData();
  };

  handleFetchData();
}

// 直接呼び出す例
asyncNoop();
// Returns: Promise<void>

await asyncNoop();
// Returns: undefined
```

#### 戻り値

(`Promise<void>`): `undefined`で解決する`Promise`です。
