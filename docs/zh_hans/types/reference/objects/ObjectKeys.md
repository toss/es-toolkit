# ObjectKeys

按照 `Object.keys` 返回的形式,将对象的键创建为联合类型。与 `keyof` 不同,数字键会被转换为字符串,符号键会被排除,与 JavaScript 中对象键始终为字符串的运行时行为一致。

```typescript
type Keys = ObjectKeys<T>;
```

## 用法

### `ObjectKeys<T>`

当你需要与 `Object.keys`、`Object.entries` 或 `for...in` 循环在运行时实际产生的值一致的键类型时使用。在为 `Object.keys` 的结果添加类型时特别有用,因为 TypeScript 默认会将其扩宽为 `string[]`。

```typescript
import type { ObjectKeys } from 'es-toolkit/types';

// keyof 将数字键保留为数字,而 ObjectKeys 将其转换为字符串。
type Keys = ObjectKeys<{ a: number; 1: string }>; // 'a' | '1'
type KeyofKeys = keyof { a: number; 1: string }; // 'a' | 1

// 为 Object.keys 的结果添加类型。
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj) as Array<ObjectKeys<typeof obj>>; // Array<'a' | 'b'>

// 索引签名会解析为其字符串形式。
type StringKeys = ObjectKeys<Record<string, number>>; // string
type NumberKeys = ObjectKeys<Record<number, string>>; // `${number}`

// 与 Object.keys 的运行时行为一样,符号键会被排除。
declare const sym: unique symbol;
type NoSymbols = ObjectKeys<{ a: number; [sym]: string }>; // 'a'
```

#### 类型参数

- `T`: 要读取键的对象类型。
