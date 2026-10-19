# JSONValue

`JSON.parse` 能够产生的任何值。

```typescript
type Value = JSONValue;
```

## 用法

### `JSONValue`

用于经过 JSON 传递的数据，例如 API 响应或配置文件。函数、`Date`、`undefined` 和类实例无法在 JSON 往返中保留，因此被排除。

```typescript
import type { JSONValue } from 'es-toolkit/types';

declare function parse(text: string): JSONValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JSONValue
}

const ok: JSONValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JSONValue = { at: new Date() }; // 报错，Date 不是 JSON。

// 只想接收 JSON 对象时使用 Record。
declare function send(body: Record<string, JSONValue>): void;
```

#### 注意事项

`NaN` 和 `Infinity` 是 `number`，所以能通过类型检查，但经过 `JSON.stringify` 会变成 `null`。类型无法拦住这一点，构造值时请留意。
