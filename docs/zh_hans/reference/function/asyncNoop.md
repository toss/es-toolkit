# asyncNoop

一个非同步的空函数。 可以用来在函数需要的地方填充空白，或者作为默认值使用。

## 接口

```typescript
function asyncNoop(): Promise<void>;
```

### 返回值

(`Promise<void>`): 这个函数返回一个Promise，它将解析为undefined。

## 示例

```typescript
import { asyncNoop } from 'es-toolkit/function';

interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // 这里fetchData是函数，所以可以安全地调用。
    await fetchData();
  };

  handleFetchData();
}
```
