# mapKeysAsync

返回一个通过异步函数转换键后的新对象。

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## 用法

### `mapKeysAsync(object, getNewKey, options?)`

当您想要通过异步转换每个键来创建新对象时,请使用 `mapKeysAsync`。值保持不变,只有键会更改为 `getNewKey` 函数返回的 Promise 中的值。

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// 为键添加前缀
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, async (value, key) => `prefix_${key}`);
// prefixed 是 { prefix_a: 1, prefix_b: 2 }

// 组合键和值来创建新键
const combined = await mapKeysAsync(obj, async (value, key) => `${key}${value}`);
// combined 是 { a1: 1, b2: 2 }

// 将键转换为大写
const uppercased = await mapKeysAsync(obj, async (value, key) => key.toString().toUpperCase());
// uppercased 是 { A: 1, B: 2 }

// 限制并发数
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// 最多同时处理 2 个键
```

#### 参数

- `object` (`T extends Record<PropertyKey, any>`): 要转换键的对象。
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): 生成新键的异步函数。接收值、键和整个对象作为参数。
- `options` (`MapKeysAsyncOptions`, 可选): 控制并发数的选项。
  - `concurrency` (`number`, 可选): 最大并发操作数。如果未指定,所有操作将并发运行。

#### 返回值

(`Promise<Record<K, T[keyof T]>>`): 返回一个包含键被转换后的新对象的 Promise。
