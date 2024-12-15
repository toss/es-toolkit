# asyncNoop

非同期で何もしない関数です。 関数を要求する場所に空白を埋めるために使用したり、デフォルトで使用することができます。

## インターフェース

```typescript
function asyncNoop(): Promise<void>;
```

### 戻り値

(`Promise<void>`): `undefined` に解決する `Promise`。

## 例

```typescript
import { asyncNoop } from 'es-toolkit/function';

interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // ここでfetchDataは関数であることが保証されているため、安全に呼び出すことができます。
    await fetchData();
  };

  handleFetchData();
}
```
