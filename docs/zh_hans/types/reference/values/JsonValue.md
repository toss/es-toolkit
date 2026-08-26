# JsonValue

`JSON.parse` 能够产生的任何值。

```typescript
type Value = JsonValue;
```

## 用法

### `JsonValue`

用于经过 JSON 传递的数据，例如 API 响应或配置文件。函数、`Date`、`undefined` 和类实例无法在 JSON 往返中保留，因此被排除。

```typescript
import type { JsonValue } from 'es-toolkit/types';

declare function parse(text: string): JsonValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JsonValue
}

const ok: JsonValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JsonValue = { at: new Date() }; // 报错，Date 不是 JSON。

// 只想接收 JSON 对象时使用 Record。
declare function send(body: Record<string, JsonValue>): void;
```

#### 类型参数

- `NaN` 和 `Infinity` 虽然是 `number`，但在 JSON 中不合法。类型无法表达这个差异。
