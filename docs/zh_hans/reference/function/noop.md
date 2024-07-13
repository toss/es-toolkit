# noop

一个什么也不做的空操作函数。可以用作占位符或默认函数。

## 签名

```typescript
function noop(): void;
```

### 返回值

(`void`): 此函数不返回任何内容。

## 示例

```typescript
import { noop } from 'es-toolkit/function';

interface Props {
  onChange?: () => void;
}

function MyComponent({ onChange = noop }: Props) {
  // 这里的 onChange 是一个函数，因此可以放心调用它。
  onChange();
}
```
