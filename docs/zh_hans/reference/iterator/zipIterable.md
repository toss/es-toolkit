# zipIterable

将多个可迭代对象按相同索引的元素配对，生成元组的可迭代对象。

```typescript
const iterable = zipIterable(iterable1, iterable2);
```

## 使用方法

### `zipIterable(...iterables)`

当你想同时遍历多个可迭代对象并将相同索引的元素配对时，请使用 `zipIterable`。与 `es-toolkit/array` 的 `zip` 不同，它不仅支持数组，还支持所有可迭代对象，并且在实际遍历之前不会消费元素。

当最短的可迭代对象耗尽时停止。

```typescript
import { zipIterable } from 'es-toolkit/iterator';

// 将两个数组的元素按相同索引配对。
const result = zipIterable([1, 2, 3], ['a', 'b', 'c']);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]

// 不仅支持数组，支持所有可迭代对象。
const result = zipIterable(new Set(['alice', 'bob']), [90, 85]);
console.log([...result]); // [['alice', 90], ['bob', 85]]
```

长度不同时，以最短的可迭代对象为准停止。

```typescript
import { zipIterable } from 'es-toolkit/iterator';

const result = zipIterable([1, 2, 3], ['a', 'b']);
console.log([...result]); // [[1, 'a'], [2, 'b']]
```

### 与 `es-toolkit/array` 的 `zip` 的区别

| | `array/zip` | `iterator/zipIterable` |
| --- | --- | --- |
| 输入 | 仅支持 `Array` | 支持所有 `Iterable` |
| 输出 | `Array` | `IterableIterator`（惰性求值） |
| 长度不同时 | 以较长的为准，用 `undefined` 填充 | 以较短的为准停止 |
| 内存 | 立即生成完整数组 | 按需消费 |

#### 参数

- `iterables` (`...Iterable<T>[]`): 要配对的可迭代对象。

#### 返回值

(`IterableIterator<T[]>`): 将相同索引的元素作为元组 yield 的惰性求值迭代器。