# count

消费一个迭代器,并返回它产生的元素数量。

```typescript
const total = count(source);
```

## 用法

### `count(source)`

当你想知道惰性流水线产生了多少个元素而不必收集它们时,请使用 `count`。与 `source.toArray().length` 不同,它在计数时不会分配数组。这是一个终结操作:它会拉取所有元素,因此不能用于无限迭代器。

```typescript
import { count } from 'es-toolkit/iterator';

// 统计迭代器的元素数量。
count([1, 2, 3].values());
// 返回: 3

// 统计经过惰性链后剩余的元素数量。
count([1, 2, 3, 4, 5].values().filter(x => x % 2 === 1));
// 返回: 3
```

#### 参数

- `source` (`Iterator<T>`): 要计数的迭代器。

#### 返回值

(`number`): `source` 产生的元素数量。

### 在 `pipe` 中使用 `count()`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式,并把它用作终结步骤。

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// 返回: 2
```
