# UnknownRecord

键和值都未知的对象。

```typescript
type Data = UnknownRecord;
```

## 用法

### `UnknownRecord`

用它代替 `{}`。`{}` 与名字相反，除了 `null` 和 `undefined` 之外连数字和字符串都能通过。值是 `unknown`，读取前必须先做检查。

```typescript
import type { UnknownRecord } from 'es-toolkit/types';

function log(data: UnknownRecord) {
  if (typeof data.id === 'string') {
    console.log(data.id);
  }
}

log({ id: '1' }); // 通过

// log(42); // 报错，而 `{}` 会放行。
```

#### 类型参数

- 只有带索引签名的类型才能赋值。`interface` 逐个声明键，因此会被拒绝。如果调用方可能传入 `interface`，请用 `object` 接收，或在调用处展开后再传。
