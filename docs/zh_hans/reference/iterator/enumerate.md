# enumerate

将可迭代对象的每个元素与其索引配对。

```typescript
const iterable = enumerate(iterable, start);
```

## 使用方法

### `enumerate(iterable, start?)`

当你在遍历时需要同时使用索引和值时，请使用 `enumerate`。与 `Array.prototype.entries()` 不同，它不仅支持数组，还支持所有可迭代对象。

```typescript
import { enumerate } from 'es-toolkit/iterator';

// 将每个元素与其索引配对。
const result = enumerate(['a', 'b', 'c']);
console.log([...result]); // [[0, 'a'], [1, 'b'], [2, 'c']]

// 不仅支持数组，支持所有可迭代对象。
for (const [index, value] of enumerate(new Set(['x', 'y', 'z']))) {
  console.log(`${index}: ${value}`);
}
// 0: x
// 1: y
// 2: z
```

可以通过第二个参数指定起始索引。

```typescript
import { enumerate } from 'es-toolkit/iterator';

const result = enumerate(['a', 'b', 'c'], 1);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### 参数

- `iterable` (`Iterable<T>`): 要枚举的可迭代对象。
- `start` (`number`, 可选): 起始索引。默认为 `0`。

#### 返回值

(`IterableIterator<[number, T]>`): yield `[索引, 元素]` 元组的惰性求值迭代器。