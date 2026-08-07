# mapValuesAsync

返回一个通过异步函数转换值后的新对象。

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## 用法

### `mapValuesAsync(object, getNewValue, options?)`

当您想要通过异步转换每个值来创建新对象时使用`mapValuesAsync`。键保持不变,只有值会更改为`getNewValue`函数的解析结果。

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// 将所有值翻倍
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubled 变为 { a: 2, b: 4, c: 6 }

// 将字符串值转换为大写
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercased 变为 { first: 'HELLO', second: 'WORLD' }

// 同时使用键和值
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades 变为 { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }

// 限制并发数
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// 最多同时处理2个值
```

#### 参数

- `object` (`T extends object`): 要转换值的源对象。
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): 生成新值的异步函数。接收值、键和整个对象作为参数。
- `options` (`MapValuesAsyncOptions`, 可选): 控制并发的选项。
  - `concurrency` (`number`, 可选): 最大并发操作数。如果未指定,所有操作将并发运行。

#### 返回值

(`Promise<Record<K, V>>`): 解析为具有转换后值的新对象的 Promise。
